import { useAuth, withRequireLogin } from "@lib/auth/ui";
import { UserRole } from "@prisma/client";
import { AdminLayout } from "@lib/admin/ui/layout/AdminLayout";
import {
  Box,
  VStack,
  HStack,
  Input,
  IconButton,
  Text,
  Flex,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import NotFoundPage from "pages/404";
import { useState } from "react";

type Message = {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
};

const AdminMessage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now(),
          text: newMessage,
          sender: "Admin",
          timestamp: new Date(),
        },
      ]);
      setNewMessage("");
    }
  };

  if (user?.role !== UserRole.ADMIN) {
    return <NotFoundPage />;
  }

  return (
    <AdminLayout>
      <Box h="calc(100vh - 100px)" p={6}>
        <VStack h="full" spacing={4}>
          <Heading size="lg" w="full">
            Messages
          </Heading>
          <Divider />

          {/* Messages Container */}
          <Flex
            flex={1}
            w="full"
            bg="white"
            borderRadius="lg"
            boxShadow="sm"
            p={4}
            overflowY="auto"
            flexDirection="column"
          >
            {messages.map((message) => (
              <Box
                key={message.id}
                alignSelf={
                  message.sender === "Admin" ? "flex-end" : "flex-start"
                }
                bg={message.sender === "Admin" ? "blue.500" : "gray.100"}
                color={message.sender === "Admin" ? "white" : "black"}
                py={2}
                px={4}
                borderRadius="lg"
                maxW="70%"
                mb={2}
              >
                <Text fontSize="sm">{message.text}</Text>
                <Text fontSize="xs" opacity={0.8}>
                  {message.timestamp.toLocaleTimeString()}
                </Text>
              </Box>
            ))}
          </Flex>

          {/* Message Input */}
          <HStack w="full" spacing={2}>
            <Input
              flex={1}
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <IconButton
              colorScheme="blue"
              aria-label="Send message"
              icon={<MdSend />}
              onClick={handleSendMessage}
            />
          </HStack>
        </VStack>
      </Box>
    </AdminLayout>
  );
};

export default withRequireLogin(AdminMessage);
