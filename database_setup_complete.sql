-- =====================================================
-- WhatsEra CRM - Complete Database Setup Script
-- Version: 2.0
-- Description: Complete database creation script for new systems
-- =====================================================

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS `wcrm` 
DEFAULT CHARACTER SET utf8mb4 
DEFAULT COLLATE utf8mb4_unicode_ci;

-- Use the database
USE `wcrm`;

-- =====================================================
-- DROP EXISTING TABLES (if they exist)
-- =====================================================
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `admin`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `agents`;
DROP TABLE IF EXISTS `phonebook`;
DROP TABLE IF EXISTS `contacts`;
DROP TABLE IF EXISTS `templets`;
DROP TABLE IF EXISTS `broadcast`;
DROP TABLE IF EXISTS `chatbot`;
DROP TABLE IF EXISTS `chat_flow`;
DROP TABLE IF EXISTS `qr_instances`;
DROP TABLE IF EXISTS `chats`;
DROP TABLE IF EXISTS `conversations`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `api_keys`;
DROP TABLE IF EXISTS `system_config`;
DROP TABLE IF EXISTS `user_sessions`;

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- CREATE TABLES
-- =====================================================

-- Admin table
CREATE TABLE `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- User table
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile_with_country_code` varchar(20) NOT NULL,
  `timezone` varchar(50) DEFAULT 'UTC',
  `plan` varchar(50) DEFAULT 'free',
  `plan_expire` datetime DEFAULT NULL,
  `trial` tinyint(1) DEFAULT 1,
  `api_key` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Agents table
CREATE TABLE `agents` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `owner_uid` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `comments` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `logs` json DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`),
  UNIQUE KEY `email` (`email`),
  KEY `owner_uid` (`owner_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Phonebook table
CREATE TABLE `phonebook` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `contact_count` int(11) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contacts table
CREATE TABLE `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `phonebook_id` int(11) NOT NULL,
  `phonebook_name` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `var1` varchar(255) DEFAULT NULL,
  `var2` varchar(255) DEFAULT NULL,
  `var3` varchar(255) DEFAULT NULL,
  `var4` varchar(255) DEFAULT NULL,
  `var5` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `phonebook_id` (`phonebook_id`),
  KEY `mobile` (`mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Templates table
CREATE TABLE `templets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` enum('text','media','interactive') DEFAULT 'text',
  `content` json NOT NULL,
  `language` varchar(10) DEFAULT 'en',
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Broadcast campaigns table
CREATE TABLE `broadcast` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `phonebook_id` int(11) NOT NULL,
  `phonebook_name` varchar(255) NOT NULL,
  `template_name` varchar(255) DEFAULT NULL,
  `template_language` varchar(10) DEFAULT 'en',
  `status` enum('PENDING','RUNNING','COMPLETED','FAILED') DEFAULT 'PENDING',
  `sent_count` int(11) DEFAULT 0,
  `delivered_count` int(11) DEFAULT 0,
  `read_count` int(11) DEFAULT 0,
  `failed_count` int(11) DEFAULT 0,
  `schedule` datetime DEFAULT NULL,
  `data` json DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Chatbot table
CREATE TABLE `chatbot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `for_all` tinyint(1) DEFAULT 0,
  `chats` json DEFAULT NULL,
  `flow` json DEFAULT NULL,
  `flow_id` varchar(50) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `origin` json DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `flow_id` (`flow_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Chat Flow table
CREATE TABLE `chat_flow` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `flow_id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `data` json NOT NULL,
  `source` enum('wa_chatbot','webhook_flow') DEFAULT 'wa_chatbot',
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `flow_id` (`flow_id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- QR Instances table
CREATE TABLE `qr_instances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `uniqueId` varchar(100) NOT NULL,
  `status` enum('GENERATING','ACTIVE','INACTIVE','DISCONNECTED') DEFAULT 'GENERATING',
  `qr_code` text DEFAULT NULL,
  `other` json DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Chats table
CREATE TABLE `chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `chatId` varchar(100) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `lastMessage` text DEFAULT NULL,
  `lastMessageTime` datetime DEFAULT NULL,
  `unreadCount` int(11) DEFAULT 0,
  `status` enum('OPEN','PENDING','RESOLVED') DEFAULT 'OPEN',
  `assignedAgent` varchar(50) DEFAULT NULL,
  `metadata` json DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `chatId` (`chatId`),
  KEY `uid` (`uid`),
  KEY `assignedAgent` (`assignedAgent`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Conversations table
CREATE TABLE `conversations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chatId` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `metaChatId` varchar(100) DEFAULT NULL,
  `msgContext` json DEFAULT NULL,
  `reaction` varchar(50) DEFAULT NULL,
  `timestamp` datetime NOT NULL,
  `senderName` varchar(255) DEFAULT NULL,
  `senderMobile` varchar(20) DEFAULT NULL,
  `status` enum('sent','delivered','read','failed') DEFAULT 'sent',
  `star` tinyint(1) DEFAULT 0,
  `route` enum('INCOMING','OUTGOING') NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `chatId` (`chatId`),
  KEY `timestamp` (`timestamp`),
  KEY `route` (`route`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Orders table
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `payment_mode` varchar(50) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT 0.00,
  `currency` varchar(3) DEFAULT 'USD',
  `status` enum('pending','paid','failed','refunded') DEFAULT 'pending',
  `data` json DEFAULT NULL,
  `s_token` varchar(255) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- System Config table
CREATE TABLE `system_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `config_key` varchar(255) NOT NULL,
  `config_value` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `config_key` (`config_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- INSERT SAMPLE DATA
-- =====================================================

-- Insert default admin user (password: admin123)
INSERT INTO `admin` (`uid`, `name`, `email`, `password`) VALUES
('admin_uid_001', 'Admin User', 'admin@whatscrm.com', '$2b$10$gV0Cn.kFwo3MqdKBKeN1hOLC4i8CLQakX8IHMk4qnFuxlcVod9OjO');

-- Insert test user (password: admin123)
INSERT INTO `user` (`uid`, `name`, `email`, `password`, `mobile_with_country_code`, `plan`, `api_key`) VALUES
('user_uid_001', 'Test User', 'user@test.com', '$2b$10$gV0Cn.kFwo3MqdKBKeN1hOLC4i8CLQakX8IHMk4qnFuxlcVod9OjO', '+1234567890', 'premium', 'test_api_key_001'),
('user_uid_002', 'John Doe', 'john@example.com', '$2b$10$gV0Cn.kFwo3MqdKBKeN1hOLC4i8CLQakX8IHMk4qnFuxlcVod9OjO', '+1234567891', 'free', NULL),
('user_uid_003', 'Jane Smith', 'jane@example.com', '$2b$10$gV0Cn.kFwo3MqdKBKeN1hOLC4i8CLQakX8IHMk4qnFuxlcVod9OjO', '+1234567892', 'premium', 'test_api_key_002');

-- Insert test agent (password: admin123)
INSERT INTO `agents` (`uid`, `owner_uid`, `name`, `email`, `mobile`, `password`, `comments`, `is_active`) VALUES
('agent_uid_001', 'user_uid_001', 'Test Agent', 'agent@test.com', '+1234567890', '$2b$10$gV0Cn.kFwo3MqdKBKeN1hOLC4i8CLQakX8IHMk4qnFuxlcVod9OjO', 'Test agent account', 1),
('agent_uid_002', 'user_uid_001', 'Support Agent', 'support@test.com', '+1234567893', '$2b$10$gV0Cn.kFwo3MqdKBKeN1hOLC4i8CLQakX8IHMk4qnFuxlcVod9OjO', 'Customer support agent', 1);

-- Insert sample phonebooks
INSERT INTO `phonebook` (`uid`, `name`, `description`, `contact_count`) VALUES
('user_uid_001', 'Customers', 'Main customer database', 150),
('user_uid_001', 'Leads', 'Potential customers', 75),
('user_uid_002', 'Newsletter', 'Newsletter subscribers', 200),
('user_uid_003', 'VIP Clients', 'Premium customers', 25);

-- Insert sample contacts
INSERT INTO `contacts` (`uid`, `phonebook_id`, `phonebook_name`, `name`, `mobile`, `var1`, `var2`) VALUES
('user_uid_001', 1, 'Customers', 'Alice Johnson', '+1234567894', 'Premium', 'New York'),
('user_uid_001', 1, 'Customers', 'Bob Wilson', '+1234567895', 'Standard', 'California'),
('user_uid_001', 2, 'Leads', 'Charlie Brown', '+1234567896', 'Interested', 'Texas'),
('user_uid_002', 3, 'Newsletter', 'Diana Prince', '+1234567897', 'Subscriber', 'Florida'),
('user_uid_003', 4, 'VIP Clients', 'Edward Norton', '+1234567898', 'VIP', 'Washington');

-- Insert sample templates
INSERT INTO `templets` (`uid`, `title`, `type`, `content`, `language`) VALUES
('user_uid_001', 'Welcome Message', 'text', '{"text": "Welcome to our service! How can we help you today?"}', 'en'),
('user_uid_001', 'Order Confirmation', 'text', '{"text": "Your order has been confirmed. Order ID: {{order_id}}"}', 'en'),
('user_uid_002', 'Promotional Offer', 'media', '{"text": "Special offer just for you!", "media": {"type": "image", "url": "promo.jpg"}}', 'en');

-- Insert sample campaigns
INSERT INTO `broadcast` (`uid`, `title`, `phonebook_id`, `phonebook_name`, `status`, `sent_count`, `delivered_count`, `read_count`) VALUES
('user_uid_001', 'Welcome Campaign', 1, 'Customers', 'COMPLETED', 150, 145, 120),
('user_uid_001', 'Product Launch', 2, 'Leads', 'RUNNING', 45, 40, 25),
('user_uid_002', 'Newsletter Campaign', 3, 'Newsletter', 'COMPLETED', 200, 195, 180);

-- Insert sample chatbots
INSERT INTO `chatbot` (`uid`, `title`, `for_all`, `active`, `flow_id`) VALUES
('user_uid_001', 'Customer Support Bot', 1, 1, 'flow_001'),
('user_uid_001', 'Order Status Bot', 0, 1, 'flow_002'),
('user_uid_002', 'FAQ Bot', 1, 1, 'flow_003');

-- Insert sample chat flows
INSERT INTO `chat_flow` (`uid`, `flow_id`, `name`, `title`, `data`, `source`) VALUES
('user_uid_001', 'flow_001', 'support_flow', 'Customer Support Flow', '{"nodes": [], "edges": []}', 'wa_chatbot'),
('user_uid_001', 'flow_002', 'order_flow', 'Order Status Flow', '{"nodes": [], "edges": []}', 'wa_chatbot'),
('user_uid_002', 'flow_003', 'faq_flow', 'FAQ Flow', '{"nodes": [], "edges": []}', 'wa_chatbot');

-- Insert sample QR instances
INSERT INTO `qr_instances` (`uid`, `title`, `uniqueId`, `status`) VALUES
('user_uid_001', 'Main WhatsApp', 'instance_001', 'ACTIVE'),
('user_uid_001', 'Support WhatsApp', 'instance_002', 'ACTIVE'),
('user_uid_002', 'Business WhatsApp', 'instance_003', 'GENERATING');

-- Insert sample chats
INSERT INTO `chats` (`uid`, `chatId`, `name`, `mobile`, `lastMessage`, `lastMessageTime`, `unreadCount`, `status`, `assignedAgent`) VALUES
('user_uid_001', 'chat_001', 'Alice Johnson', '+1234567894', 'Thank you for your help!', NOW(), 0, 'RESOLVED', 'agent_uid_001'),
('user_uid_001', 'chat_002', 'Bob Wilson', '+1234567895', 'I need help with my order', NOW(), 2, 'PENDING', 'agent_uid_001'),
('user_uid_001', 'chat_003', 'Charlie Brown', '+1234567896', 'Hello, I am interested in your product', NOW(), 1, 'OPEN', NULL);

-- Insert sample orders
INSERT INTO `orders` (`uid`, `payment_mode`, `amount`, `status`, `transaction_id`) VALUES
('user_uid_001', 'stripe', 29.99, 'paid', 'txn_001'),
('user_uid_002', 'paypal', 99.99, 'paid', 'txn_002'),
('user_uid_003', 'stripe', 49.99, 'pending', 'txn_003');

-- Insert system configuration
INSERT INTO `system_config` (`config_key`, `config_value`, `description`) VALUES
('app_name', 'WhatsEra', 'Application name'),
('app_version', '2.0', 'Application version'),
('max_contacts_free', '100', 'Maximum contacts for free plan'),
('max_contacts_premium', '10000', 'Maximum contacts for premium plan'),
('default_timezone', 'UTC', 'Default timezone for new users'),
('smtp_host', 'localhost', 'SMTP server host'),
('smtp_port', '587', 'SMTP server port');

-- =====================================================
-- CREATE ADDITIONAL INDEXES FOR PERFORMANCE
-- =====================================================

-- Indexes for better query performance
CREATE INDEX idx_user_email ON `user` (`email`);
CREATE INDEX idx_user_plan ON `user` (`plan`);
CREATE INDEX idx_contacts_mobile ON `contacts` (`mobile`);
CREATE INDEX idx_contacts_phonebook ON `contacts` (`phonebook_id`, `uid`);
CREATE INDEX idx_broadcast_status ON `broadcast` (`status`, `uid`);
CREATE INDEX idx_chats_status ON `chats` (`status`, `uid`);
CREATE INDEX idx_conversations_chat_time ON `conversations` (`chatId`, `timestamp`);
CREATE INDEX idx_orders_user_status ON `orders` (`uid`, `status`);
CREATE INDEX idx_qr_status ON `qr_instances` (`status`, `uid`);

-- =====================================================
-- CREATE FOREIGN KEY CONSTRAINTS
-- =====================================================

-- Add foreign key constraints for data integrity
ALTER TABLE `agents` ADD CONSTRAINT `fk_agents_owner` FOREIGN KEY (`owner_uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE;
ALTER TABLE `phonebook` ADD CONSTRAINT `fk_phonebook_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE;
ALTER TABLE `contacts` ADD CONSTRAINT `fk_contacts_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE;
ALTER TABLE `contacts` ADD CONSTRAINT `fk_contacts_phonebook` FOREIGN KEY (`phonebook_id`) REFERENCES `phonebook` (`id`) ON DELETE CASCADE;
ALTER TABLE `templets` ADD CONSTRAINT `fk_templets_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE;
ALTER TABLE `broadcast` ADD CONSTRAINT `fk_broadcast_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE;
ALTER TABLE `chatbot` ADD CONSTRAINT `fk_chatbot_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE;
ALTER TABLE `chat_flow` ADD CONSTRAINT `fk_chat_flow_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE;
ALTER TABLE `qr_instances` ADD CONSTRAINT `fk_qr_instances_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE;
ALTER TABLE `chats` ADD CONSTRAINT `fk_chats_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE;
ALTER TABLE `conversations` ADD CONSTRAINT `fk_conversations_chat` FOREIGN KEY (`chatId`) REFERENCES `chats` (`chatId`) ON DELETE CASCADE;
ALTER TABLE `orders` ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`) ON DELETE CASCADE;

-- =====================================================
-- CREATE TRIGGERS FOR AUTOMATIC UPDATES
-- =====================================================

-- Trigger to update contact count in phonebook
DELIMITER $$
CREATE TRIGGER update_phonebook_count_insert
AFTER INSERT ON contacts
FOR EACH ROW
BEGIN
    UPDATE phonebook
    SET contact_count = (SELECT COUNT(*) FROM contacts WHERE phonebook_id = NEW.phonebook_id)
    WHERE id = NEW.phonebook_id;
END$$

CREATE TRIGGER update_phonebook_count_delete
AFTER DELETE ON contacts
FOR EACH ROW
BEGIN
    UPDATE phonebook
    SET contact_count = (SELECT COUNT(*) FROM contacts WHERE phonebook_id = OLD.phonebook_id)
    WHERE id = OLD.phonebook_id;
END$$
DELIMITER ;

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================

SELECT 'WhatsEra CRM Database Setup Complete!' as Status,
       'Database: wcrm' as Database_Name,
       'Tables Created: 13' as Tables_Count,
       'Sample Data: Inserted' as Sample_Data,
       'Indexes: Created' as Indexes,
       'Foreign Keys: Added' as Foreign_Keys,
       'Triggers: Created' as Triggers;

-- =====================================================
-- SHOW CREATED TABLES
-- =====================================================

SHOW TABLES;

-- =====================================================
-- END OF SCRIPT
-- =====================================================
