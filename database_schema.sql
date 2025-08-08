-- WhatsCRM v5.0 Database Schema
-- This file contains all the necessary tables for the WhatsCRM application

-- Users table
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile_with_country_code` varchar(20) DEFAULT NULL,
  `plan` text DEFAULT NULL,
  `plan_expire` timestamp NULL DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Admin table
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Plans table
CREATE TABLE IF NOT EXISTS `plan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `short_description` text DEFAULT NULL,
  `allow_tag` tinyint(1) DEFAULT 0,
  `allow_note` tinyint(1) DEFAULT 0,
  `allow_chatbot` tinyint(1) DEFAULT 0,
  `contact_limit` int(11) DEFAULT 0,
  `allow_api` tinyint(1) DEFAULT 0,
  `is_trial` tinyint(1) DEFAULT 0,
  `price` decimal(10,2) DEFAULT 0.00,
  `price_strike` decimal(10,2) DEFAULT 0.00,
  `plan_duration_in_days` int(11) DEFAULT 1,
  `qr_account` int(11) DEFAULT 0,
  `wa_warmer` tinyint(1) DEFAULT 0,
  `rest_api_qr` tinyint(1) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Conversations table
CREATE TABLE IF NOT EXISTS `beta_conversation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) DEFAULT 'text',
  `chat_id` varchar(255) NOT NULL,
  `uid` varchar(50) NOT NULL,
  `status` varchar(50) DEFAULT '',
  `metaChatId` varchar(255) DEFAULT '',
  `msgContext` text DEFAULT NULL,
  `reaction` varchar(255) DEFAULT NULL,
  `timestamp` bigint(20) DEFAULT NULL,
  `senderName` varchar(255) DEFAULT NULL,
  `senderMobile` varchar(20) DEFAULT NULL,
  `star` tinyint(1) DEFAULT 0,
  `route` varchar(50) DEFAULT 'OUTGOING',
  `context` text DEFAULT NULL,
  `origin` varchar(50) DEFAULT 'meta',
  `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `chat_id` (`chat_id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Chats table
CREATE TABLE IF NOT EXISTS `chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chat_id` varchar(255) NOT NULL,
  `uid` varchar(50) NOT NULL,
  `last_message_came` timestamp NULL DEFAULT NULL,
  `sender_name` varchar(255) DEFAULT 'NA',
  `sender_mobile` varchar(20) DEFAULT 'NA',
  `last_message` text DEFAULT NULL,
  `is_opened` tinyint(1) DEFAULT 0,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `chat_uid` (`chat_id`, `uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Broadcast table
CREATE TABLE IF NOT EXISTS `broadcast` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `status` varchar(50) DEFAULT 'QUEUE',
  `message` text DEFAULT NULL,
  `phonebook_id` varchar(50) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Beta Campaign table
CREATE TABLE IF NOT EXISTS `beta_campaign` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `campaign_id` varchar(50) NOT NULL,
  `uid` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `template_name` varchar(255) DEFAULT NULL,
  `template_language` varchar(10) DEFAULT NULL,
  `phonebook_id` varchar(50) DEFAULT NULL,
  `phonebook_name` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'PENDING',
  `total_contacts` int(11) DEFAULT 0,
  `body_variables` text DEFAULT NULL,
  `header_variable` text DEFAULT NULL,
  `button_variables` text DEFAULT NULL,
  `schedule` timestamp NULL DEFAULT NULL,
  `timezone` varchar(50) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `campaign_id` (`campaign_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Beta Campaign Logs table
CREATE TABLE IF NOT EXISTS `beta_campaign_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `campaign_id` varchar(50) NOT NULL,
  `uid` varchar(50) NOT NULL,
  `contact_name` varchar(255) DEFAULT NULL,
  `contact_mobile` varchar(20) NOT NULL,
  `status` varchar(50) DEFAULT 'PENDING',
  `delivery_status` varchar(50) DEFAULT NULL,
  `error_message` text DEFAULT NULL,
  `message_id` varchar(255) DEFAULT NULL,
  `retry_count` int(11) DEFAULT 0,
  `delivery_time` timestamp NULL DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `campaign_id` (`campaign_id`),
  KEY `uid` (`uid`),
  KEY `status` (`status`),
  KEY `contact_mobile` (`contact_mobile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Beta Chatbot table
CREATE TABLE IF NOT EXISTS `beta_chatbot` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `origin_id` varchar(255) NOT NULL,
  `flow_id` varchar(50) NOT NULL,
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Beta Flows table
CREATE TABLE IF NOT EXISTS `beta_flows` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `flow_id` varchar(50) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `source` varchar(50) DEFAULT 'wa_chatbot',
  `title` varchar(255) DEFAULT NULL,
  `nodes` text DEFAULT NULL,
  `edges` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `flow_id` (`flow_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Flow Session table
CREATE TABLE IF NOT EXISTS `flow_session` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `origin` varchar(50) NOT NULL,
  `origin_id` varchar(255) NOT NULL,
  `flow_id` varchar(50) NOT NULL,
  `sender_mobile` varchar(20) NOT NULL,
  `data` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `flow_id` (`flow_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Instance table (for QR codes)
CREATE TABLE IF NOT EXISTS `instance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `uniqueId` varchar(255) NOT NULL,
  `status` varchar(50) DEFAULT 'GENERATING',
  `number` varchar(20) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueId` (`uniqueId`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Templates table
CREATE TABLE IF NOT EXISTS `templets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `type` varchar(50) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Agents table
CREATE TABLE IF NOT EXISTS `agents` (
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`),
  KEY `owner_uid` (`owner_uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Warmer Script table
CREATE TABLE IF NOT EXISTS `warmer_script` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Warmers table
CREATE TABLE IF NOT EXISTS `warmers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Auth table (for Baileys WhatsApp sessions)
CREATE TABLE IF NOT EXISTS `auth` (
  `session` varchar(50) NOT NULL,
  `id` varchar(100) NOT NULL,
  `value` json DEFAULT NULL,
  UNIQUE KEY `idxunique` (`session`,`id`),
  KEY `idxsession` (`session`),
  KEY `idxid` (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- Phonebook table
CREATE TABLE IF NOT EXISTS `phonebook` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Contacts table
CREATE TABLE IF NOT EXISTS `contacts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(50) NOT NULL,
  `phonebook_id` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`),
  KEY `phonebook_id` (`phonebook_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert default admin user (password: admin123)
INSERT IGNORE INTO `admin` (`uid`, `name`, `email`, `password`) VALUES
('admin_uid_001', 'Admin User', 'admin@whatscrm.com', '$2b$10$gV0Cn.kFwo3MqdKBKeN1hOLC4i8CLQakX8IHMk4qnFuxlcVod9OjO');

-- Insert test user (password: user123)
INSERT IGNORE INTO `user` (`uid`, `name`, `email`, `password`, `mobile_with_country_code`) VALUES
('user_uid_001', 'Test User', 'user@test.com', '$2b$10$gV0Cn.kFwo3MqdKBKeN1hOLC4i8CLQakX8IHMk4qnFuxlcVod9OjO', '+1234567890');

-- Insert test agent (password: agent123)
INSERT IGNORE INTO `agents` (`uid`, `owner_uid`, `name`, `email`, `mobile`, `password`, `comments`, `is_active`) VALUES
('agent_uid_001', 'user_uid_001', 'Test Agent', 'agent@test.com', '+1234567890', '$2b$10$gV0Cn.kFwo3MqdKBKeN1hOLC4i8CLQakX8IHMk4qnFuxlcVod9OjO', 'Test agent account', 1);

-- Insert default plan
INSERT IGNORE INTO `plan` (`title`, `short_description`, `allow_tag`, `allow_note`, `allow_chatbot`, `contact_limit`, `allow_api`, `is_trial`, `price`, `price_strike`, `plan_duration_in_days`, `qr_account`, `wa_warmer`, `rest_api_qr`) VALUES
('Free Plan', 'Basic free plan with limited features', 1, 1, 1, 100, 1, 1, 0.00, 0.00, 30, 1, 1, 1);
