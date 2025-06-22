import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Avatar, List, ListItemButton, ListItemAvatar, ListItemText,
    Divider, InputBase, Paper, IconButton, TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import { getAllConversationsAPI, getConversationByIdAPI } from '../../services/UsersSevices';
import { startSignalRConnection, sendMessage, stopSignalRConnection } from '../../services/SignalRService';
import { jwtDecode } from 'jwt-decode';

const Chat = () => {
    const [newMessage, setNewMessage] = useState('');
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [userId, setUserId] = useState(null);

    // Decode token & set userId
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const uid = decoded?.Id || decoded?.sub;
            if (uid) {
                setUserId(uid);
            } else {
                console.warn('Không tìm thấy Id/sub trong token');
            }
        } catch (error) {
            console.error('Lỗi khi decode token:', error);
        }
    }, []);

    // Fetch conversations on mount
    useEffect(() => {
        const fetchConversations = async () => {
            setLoadingMessages(true);
            try {
                const data = await getAllConversationsAPI();
                if (Array.isArray(data)) {
                    setConversations(data);
                    if (data.length > 0) {
                        await handleSelectConversation(data[0].id); 
                    }
                } else {
                    console.warn('Dữ liệu conversations không hợp lệ:', data);
                }
            } catch (err) {
                console.error('Lỗi khi fetch conversations:', err);
                setConversations([]);
            } finally {
                setLoadingMessages(false);
            }
        };

        fetchConversations();
    }, []);

    // Chọn 1 cuộc trò chuyện
    const handleSelectConversation = async (id) => {
        if (!id) return;
        setSelectedConversationId(id);
        setLoadingMessages(true);
        try {
            const res = await getConversationByIdAPI(id);
            setMessages(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.error(`Lỗi khi lấy tin nhắn cho conversation ${id}:`, err);
            setMessages([]);
        } finally {
            setLoadingMessages(false);
        }
    };

    // Kết nối SignalR và nhận message real-time
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        let isMounted = true;

        const setupSignalR = async () => {
            try {
                const decoded = jwtDecode(token);
                const uid = decoded?.Id || decoded?.sub;
                if (!uid) {
                    console.warn('⚠️ Không tìm thấy userId trong token');
                    return;
                }
                setUserId(uid);

                await startSignalRConnection(token, (msg) => {
                    if (!isMounted) return;
                    console.log("📥 Received message:", msg);

                    // Nếu là message cho conversation hiện tại
                    if (msg.conversationId === selectedConversationId) {
                        setMessages((prev) => [msg, ...prev]); // prepend do column-reverse
                    }
                });
            } catch (err) {
                console.error('Lỗi khi thiết lập SignalR:', err);
            }
        };

        setupSignalR();

        // Cleanup khi unmount
        return () => {
            isMounted = false;
            stopSignalRConnection();
        };
    }, [selectedConversationId]);

    // Gửi tin nhắn
    const handleSend = async () => {
        const messageToSend = newMessage.trim();
        if (!messageToSend) return;

        if (!userId || !selectedConversationId) {
            console.warn("Không có userId hoặc conversationId khi gửi tin nhắn");
            return;
        }

        try {
            await sendMessage(selectedConversationId, userId, messageToSend);
            setNewMessage('');
        } catch (err) {
            console.error("Lỗi khi gửi tin nhắn:", err);
        }
    };

    // Lọc danh sách cuộc trò chuyện
    const filteredConversations = conversations.filter(item =>
        item.sender?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupMessagesByDate = (msgs) => {
        const grouped = {};
        msgs.forEach((msg) => {
            const date = new Date(msg.createdTime).toLocaleDateString('vi-VN');
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(msg);
        });
        return grouped;
    };

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                bgcolor: '#f5f5f5',
                gap: 2,
                p: 2,
                boxSizing: 'border-box',
            }}
        >
            {/* Sidebar */}
            <Box
                sx={{
                    width: 300,
                    bgcolor: '#fff',
                    borderRadius: 3,
                    boxShadow: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 2,
                    overflow: 'hidden',
                }}
            >
                {/* Search */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: 'white',
                    borderRadius: '999px',
                    px: 2,
                    py: '6px',
                    boxShadow: '0 0 0 1px #ccc',
                }}>
                    <SearchIcon sx={{ color: 'gray', mr: 1 }} />
                    <InputBase
                        placeholder="Tên người dùng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            flex: 1,
                            color: 'gray',
                            fontSize: 16,
                            '& .MuiInputBase-input': { p: 0 },
                            '&:focus-within': { outline: 'none' }
                        }}
                    />
                </Box>

                {/* Conversation List */}
                <Box sx={{ mt: 2, overflowY: 'auto', flexGrow: 1, minHeight: 0 }}>
                    {filteredConversations.length === 0 ? (
                        <Typography variant="body2">Không có cuộc trò chuyện nào.</Typography>
                    ) : (
                        <List disablePadding>
                            {filteredConversations.map((item) => (
                                <ListItemButton
                                    key={item.id}
                                    onClick={() => handleSelectConversation(item.id)}
                                    sx={{
                                        borderRadius: 2,
                                        mb: 1,
                                        bgcolor: selectedConversationId === item.id ? '#f1f3f5' : 'transparent'
                                    }}
                                >
                                    <ListItemAvatar>
                                        <Avatar src={item.sender?.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        disableTypography
                                        primary={
                                            <Box>
                                                <Typography fontWeight={500}>{item.sender?.name || 'Unknown'}</Typography>
                                                <Box display="flex" justifyContent="space-between" mt={0.5}>
                                                    <Typography noWrap sx={{ flex: 1, fontSize: 13, color: '#666' }}>
                                                        {item.lastMessage}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 12, color: '#aaa', ml: 1 }}>
                                                        {item.lastMessageTime
                                                            ? new Date(item.lastMessageTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
                                                            : ''}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        }
                                    />

                                </ListItemButton>
                            ))}
                        </List>
                    )}
                </Box>
            </Box>

            {/* Chat Area */}
            <Box
                sx={{
                    flex: 1,
                    bgcolor: '#fff',
                    borderRadius: 3,
                    boxShadow: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    p: 3,
                    overflow: 'hidden',
                }}
            >

                {/* Header */}
                <Box>
                    <Typography variant="h6" fontWeight={600}>
                        {conversations.find(c => c.id === selectedConversationId)?.sender?.name || 'Chat'}
                    </Typography>
                    <Divider sx={{ my: 1, bgcolor: '#ccc' }} />
                </Box>

                {/* Messages (scrollable, align bottom) */}
                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        minHeight: 0,
                        pb: 1,
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {Object.entries(groupMessagesByDate(messages)).map(([date, msgs]) => (
                            <React.Fragment key={date}>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        textAlign: 'center',
                                        width: '100%',
                                        color: '#888',
                                        fontSize: 12,
                                        my: 2,
                                    }}
                                >
                                    {date}
                                </Typography>

                                {msgs.map((msg, index) => {
                                    const isOwn = msg.senderId === userId;
                                    return (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: 'flex',
                                                justifyContent: isOwn ? 'flex-end' : 'flex-start',
                                                alignItems: 'flex-end',
                                                mb: 2,
                                                gap: 1
                                            }}
                                        >
                                            {!isOwn && (
                                                <Avatar src={msg.senderAvatar} sx={{ width: 32, height: 32 }} />
                                            )}
                                            <Paper
                                                elevation={0}
                                                sx={{
                                                    maxWidth: '60%',
                                                    p: 2,
                                                    borderRadius: 3,
                                                    backgroundColor: isOwn ? '#3F5139' : '#f4f4f4',
                                                    color: isOwn ? '#fff' : '#000',
                                                }}
                                            >
                                                <Typography sx={{ wordBreak: 'break-word' }}>{msg.content}</Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{ display: 'block', textAlign: 'right', mt: 1 }}
                                                >
                                                    {new Date(msg.createdTime).toLocaleTimeString('vi-VN', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </Typography>
                                            </Paper>
                                        </Box>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </Box>
                </Box>

                {/* Input */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 2,
                        borderTop: '1px solid #e0e0e0',
                        pt: 1,
                        px: 1,
                    }}
                >
                    <TextField
                        fullWidth
                        placeholder="Nhập tin nhắn..."
                        variant="standard"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        InputProps={{
                            disableUnderline: true,
                            sx: { pl: 2 }
                        }}
                    />
                    <IconButton onClick={handleSend} sx={{ bgcolor: '#425A41', color: '#fff', ml: 1, '&:hover': { bgcolor: '#375837' } }}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default Chat;
