-- Fix missing columns for WhatsCRM
ALTER TABLE `beta_campaign` ADD COLUMN IF NOT EXISTS `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP;
