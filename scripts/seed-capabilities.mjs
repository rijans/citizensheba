#!/usr/bin/env node
/**
 * One-shot seed: inject curated capabilities into Service Markdown.
 * Run: node scripts/seed-capabilities.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const DIR = path.join(process.cwd(), 'src/content/services');

/** @type {Record<string, { en: string; bn: string }[]>} */
const CAPABILITIES = {
  a2i: [
    { en: 'Explore digital initiatives', bn: 'ডিজিটাল উদ্যোগ দেখুন' },
    { en: 'Find citizen services', bn: 'নাগরিক সেবা খুঁজুন' },
    { en: 'Read programme updates', bn: 'কর্মসূচির আপডেট পড়ুন' },
  ],
  banbeis: [
    { en: 'Browse education statistics', bn: 'শিক্ষা পরিসংখ্যান দেখুন' },
    { en: 'Download publications', bn: 'প্রকাশনা ডাউনলোড করুন' },
    { en: 'Find research data', bn: 'গবেষণা তথ্য খুঁজুন' },
  ],
  'bangladesh-bank': [
    { en: 'Read monetary policy', bn: 'মুদ্রানীতি পড়ুন' },
    { en: 'View banking notices', bn: 'ব্যাংকিং নোটিশ দেখুন' },
    { en: 'Find public information', bn: 'জনতথ্য খুঁজুন' },
  ],
  'bangladesh-post': [
    { en: 'Track postal items', bn: 'ডাক আইটেম ট্র‍্যাক করুন' },
    { en: 'Find post-office guidance', bn: 'পোস্ট অফিস নির্দেশনা' },
    { en: 'Explore postal services', bn: 'ডাক সেবা দেখুন' },
  ],
  'bangladesh-visa': [
    { en: 'Start MRV application', bn: 'এমআরভি আবেদন শুরু' },
    { en: 'Check visa guidance', bn: 'ভিসা নির্দেশনা দেখুন' },
    { en: 'Follow application steps', bn: 'আবেদনের ধাপ অনুসরণ' },
  ],
  bcc: [
    { en: 'Read ICT standards', bn: 'আইসিটি মান পড়ুন' },
    { en: 'Explore digital initiatives', bn: 'ডিজিটাল উদ্যোগ দেখুন' },
    { en: 'Find ICT information', bn: 'আইসিটি তথ্য খুঁজুন' },
  ],
  bdris: [
    { en: 'Apply for birth certificate', bn: 'জন্ম সনদের আবেদন' },
    { en: 'Apply for death certificate', bn: 'মৃত্যু সনদের আবেদন' },
    { en: 'Track application status', bn: 'আবেদনের অবস্থা ট্র‍্যাক' },
    { en: 'Verify certificate', bn: 'সনদ যাচাই করুন' },
  ],
  berc: [
    { en: 'View energy tariffs', bn: 'জ্বালানি ট্যারিফ দেখুন' },
    { en: 'Read regulation notices', bn: 'নিয়ন্ত্রণ নোটিশ পড়ুন' },
    { en: 'Find commission updates', bn: 'কমিশন আপডেট খুঁজুন' },
  ],
  bfsa: [
    { en: 'Read food safety advisories', bn: 'খাদ্য নিরাপত্তা সতর্কতা' },
    { en: 'View regulation updates', bn: 'নিয়ন্ত্রণ আপডেট দেখুন' },
    { en: 'Find public guidance', bn: 'জন নির্দেশনা খুঁজুন' },
  ],
  bida: [
    { en: 'Explore investment info', bn: 'বিনিয়োগ তথ্য দেখুন' },
    { en: 'Access one-stop services', bn: 'ওয়ান-স্টপ সেবা নিন' },
    { en: 'Read investor guidance', bn: 'বিনিয়োগকারী নির্দেশনা' },
  ],
  biman: [
    { en: 'Check flight information', bn: 'ফ্লাইট তথ্য দেখুন' },
    { en: 'Start ticket booking', bn: 'টিকিট বুকিং শুরু' },
    { en: 'Find travel updates', bn: 'ভ্রমণ আপডেট খুঁজুন' },
  ],
  biwta: [
    { en: 'View waterway information', bn: 'নৌপথ তথ্য দেখুন' },
    { en: 'Read navigation notices', bn: 'নৌচলাচল নোটিশ পড়ুন' },
    { en: 'Find regulation updates', bn: 'নিয়ন্ত্রণ আপডেট খুঁজুন' },
  ],
  biwtc: [
    { en: 'Check passenger services', bn: 'যাত্রী সেবা দেখুন' },
    { en: 'View cargo information', bn: 'মালামাল তথ্য দেখুন' },
    { en: 'Find schedule updates', bn: 'সময়সূচি আপডেট' },
  ],
  bmd: [
    { en: 'Check weather forecast', bn: 'আবহাওয়া পূর্বাভাস' },
    { en: 'View weather warnings', bn: 'আবহাওয়া সতর্কতা' },
    { en: 'Read climate information', bn: 'জলবায়ু তথ্য পড়ুন' },
  ],
  bmet: [
    { en: 'Apply for emigration clearance', bn: 'বহির্গমন ক্লিয়ারেন্স' },
    { en: 'Track clearance status', bn: 'ক্লিয়ারেন্স অবস্থা' },
    { en: 'Read overseas employment guidance', bn: 'বৈদেশিক কর্মসংস্থান নির্দেশনা' },
  ],
  bou: [
    { en: 'Browse programmes', bn: 'প্রোগ্রাম দেখুন' },
    { en: 'Find admission info', bn: 'ভর্তি তথ্য খুঁজুন' },
    { en: 'Check exam notices', bn: 'পরীক্ষা নোটিশ দেখুন' },
  ],
  bpdb: [
    { en: 'View power sector info', bn: 'বিদ্যুৎ খাতের তথ্য' },
    { en: 'Find published services', bn: 'প্রকাশিত সেবা খুঁজুন' },
    { en: 'Read board notices', bn: 'বোর্ড নোটিশ পড়ুন' },
  ],
  breb: [
    { en: 'Find rural electricity info', bn: 'পল্লী বিদ্যুৎ তথ্য' },
    { en: 'Explore PBS-linked services', bn: 'পবিস-সংক্রান্ত সেবা' },
    { en: 'Read board guidance', bn: 'বোর্ড নির্দেশনা পড়ুন' },
  ],
  brta: [
    { en: 'Apply for driving licence', bn: 'ড্রাইভিং লাইসেন্স আবেদন' },
    { en: 'Register a vehicle', bn: 'মোটরযান নিবন্ধন' },
    { en: 'Pay transport fees', bn: 'পরিবহন ফি পরিশোধ' },
  ],
  bscic: [
    { en: 'Explore SME services', bn: 'এসএমই সেবা দেখুন' },
    { en: 'Find cottage industry info', bn: 'কুটির শিল্প তথ্য' },
    { en: 'Read programme guidance', bn: 'কর্মসূচি নির্দেশনা' },
  ],
  btcl: [
    { en: 'Manage telephone services', bn: 'টেলিফোন সেবা ব্যবস্থাপনা' },
    { en: 'Access customer portal', bn: 'গ্রাহক পোর্টাল খুলুন' },
    { en: 'Find billing help', bn: 'বিলিং সহায়তা খুঁজুন' },
  ],
  btrc: [
    { en: 'Read telecom notices', bn: 'টেলিকম নোটিশ পড়ুন' },
    { en: 'View regulation updates', bn: 'নিয়ন্ত্রণ আপডেট' },
    { en: 'Find public information', bn: 'জনতথ্য খুঁজুন' },
  ],
  buet: [
    { en: 'Check admission info', bn: 'ভর্তি তথ্য দেখুন' },
    { en: 'Read academic notices', bn: 'একাডেমিক নোটিশ' },
    { en: 'Find university updates', bn: 'বিশ্ববিদ্যালয় আপডেট' },
  ],
  caab: [
    { en: 'Read aviation regulations', bn: 'বিমান চলাচল নিয়ম' },
    { en: 'View airport information', bn: 'বিমানবন্দর তথ্য' },
    { en: 'Find public notices', bn: 'জন নোটিশ খুঁজুন' },
  ],
  coastguard: [
    { en: 'Read maritime safety info', bn: 'সমুদ্রসীমা নিরাপত্তা' },
    { en: 'View published notices', bn: 'প্রকাশিত নোটিশ দেখুন' },
    { en: 'Find Coast Guard updates', bn: 'কোস্ট গার্ড আপডেট' },
  ],
  customs: [
    { en: 'Read customs procedures', bn: 'কাস্টমস পদ্ধতি পড়ুন' },
    { en: 'View trade notices', bn: 'বাণিজ্য নোটিশ দেখুন' },
    { en: 'Find trade guidance', bn: 'বাণিজ্য নির্দেশনা' },
  ],
  dae: [
    { en: 'Read farmer advisories', bn: 'কৃষক পরামর্শ পড়ুন' },
    { en: 'Find extension information', bn: 'সম্প্রসারণ তথ্য' },
    { en: 'View agriculture updates', bn: 'কৃষি আপডেট দেখুন' },
  ],
  desco: [
    { en: 'Check electricity account', bn: 'বিদ্যুৎ অ্যাকাউন্ট দেখুন' },
    { en: 'Pay or view bills', bn: 'বিল দেখুন বা পরিশোধ' },
    { en: 'Find customer services', bn: 'গ্রাহক সেবা খুঁজুন' },
  ],
  dgda: [
    { en: 'Read medicine regulation', bn: 'ওষুধ নিয়ন্ত্রণ তথ্য' },
    { en: 'View drug-safety updates', bn: 'ওষুধ নিরাপত্তা আপডেট' },
    { en: 'Find public guidance', bn: 'জন নির্দেশনা খুঁজুন' },
  ],
  dgfp: [
    { en: 'Explore FP programmes', bn: 'পরিবার পরিকল্পনা কর্মসূচি' },
    { en: 'Read health information', bn: 'স্বাস্থ্য তথ্য পড়ুন' },
    { en: 'Find service guidance', bn: 'সেবা নির্দেশনা খুঁজুন' },
  ],
  dghs: [
    { en: 'Explore health programmes', bn: 'স্বাস্থ্য কর্মসূচি দেখুন' },
    { en: 'Read health information', bn: 'স্বাস্থ্য তথ্য পড়ুন' },
    { en: 'Find related services', bn: 'সংশ্লিষ্ট সেবা খুঁজুন' },
  ],
  'dhaka-wasa': [
    { en: 'Manage water account', bn: 'পানি অ্যাকাউন্ট ব্যবস্থাপনা' },
    { en: 'Pay water bills', bn: 'পানির বিল পরিশোধ' },
    { en: 'Access sewer services', bn: 'স্যুয়ারেজ সেবা নিন' },
  ],
  dip: [
    { en: 'Find passport information', bn: 'পাসপোর্ট তথ্য খুঁজুন' },
    { en: 'Read immigration guidance', bn: 'ইমিগ্রেশন নির্দেশনা' },
    { en: 'View department notices', bn: 'অধিদপ্তর নোটিশ দেখুন' },
  ],
  doict: [
    { en: 'Explore ICT programmes', bn: 'আইসিটি কর্মসূচি দেখুন' },
    { en: 'Find digital-service info', bn: 'ডিজিটাল সেবা তথ্য' },
    { en: 'Read department updates', bn: 'অধিদপ্তর আপডেট' },
  ],
  dpdc: [
    { en: 'View e-bill', bn: 'ই-বিল দেখুন' },
    { en: 'Access customer service', bn: 'গ্রাহক সেবা নিন' },
    { en: 'Manage electricity account', bn: 'বিদ্যুৎ অ্যাকাউন্ট' },
  ],
  dshe: [
    { en: 'Read school/college admin info', bn: 'স্কুল-কলেজ প্রশাসন তথ্য' },
    { en: 'View education notices', bn: 'শিক্ষা নোটিশ দেখুন' },
    { en: 'Find directorate updates', bn: 'অধিদপ্তর আপডেট' },
  ],
  dss: [
    { en: 'Explore welfare programmes', bn: 'কল্যাণ কর্মসূচি দেখুন' },
    { en: 'Read public guidance', bn: 'জন নির্দেশনা পড়ুন' },
    { en: 'Find social service info', bn: 'সমাজসেবা তথ্য' },
  ],
  du: [
    { en: 'Check admission info', bn: 'ভর্তি তথ্য দেখুন' },
    { en: 'Read academic notices', bn: 'একাডেমিক নোটিশ' },
    { en: 'Find university information', bn: 'বিশ্ববিদ্যালয় তথ্য' },
  ],
  ecourt: [
    { en: 'Submit a citizen report', bn: 'নাগরিক অভিযোগ জমা' },
    { en: 'Access mobile court services', bn: 'মোবাইল কোর্ট সেবা' },
    { en: 'Follow case guidance', bn: 'মামলা নির্দেশনা' },
  ],
  'edu-results': [
    { en: 'Check SSC results', bn: 'এসএসসি ফলাফল দেখুন' },
    { en: 'Check HSC results', bn: 'এইচএসসি ফলাফল দেখুন' },
    { en: 'View board exam results', bn: 'বোর্ড পরীক্ষার ফল' },
  ],
  ekpay: [
    { en: 'Pay utility bills', bn: 'ইউটিলিটি বিল পরিশোধ' },
    { en: 'Pay selected service fees', bn: 'নির্বাচিত সেবা ফি' },
    { en: 'Use government payment gateway', bn: 'সরকারি পেমেন্ট গেটওয়ে' },
  ],
  epassport: [
    { en: 'Apply for e-Passport', bn: 'ই-পাসপোর্ট আবেদন' },
    { en: 'Apply for MRP', bn: 'এমআরপি আবেদন' },
    { en: 'Book appointment', bn: 'অ্যাপয়েন্টমেন্ট বুকিং' },
  ],
  epb: [
    { en: 'Explore export programmes', bn: 'রপ্তানি কর্মসূচি দেখুন' },
    { en: 'Find exporter information', bn: 'রপ্তানিকারক তথ্য' },
    { en: 'Read promotion guidance', bn: 'উন্নয়ন নির্দেশনা' },
  ],
  eporcha: [
    { en: 'Search Khatian records', bn: 'খতিয়ান অনুসন্ধান' },
    { en: 'Apply for certified copy', bn: 'সত্যায়িত কপির আবেদন' },
    { en: 'Find Mouza maps', bn: 'মৌজা ম্যাপ খুঁজুন' },
  ],
  eprocure: [
    { en: 'Browse tender notices', bn: 'দরপত্র নোটিশ দেখুন' },
    { en: 'Join e-GP participation', bn: 'ই-জিপি অংশগ্রহণ' },
    { en: 'Find procurement guidance', bn: 'কেনাকাটা নির্দেশনা' },
  ],
  ereturn: [
    { en: 'Submit income tax return', bn: 'আয়কর রিটার্ন জমা' },
    { en: 'File yearly return online', bn: 'বার্ষিক রিটার্ন অনলাইন' },
    { en: 'Access NBR tax portal', bn: 'এনবিআর ট্যাক্স পোর্টাল' },
  ],
  etin: [
    { en: 'Register for new TIN', bn: 'নতুন টিআইএন নিবন্ধন' },
    { en: 'Manage existing TIN', bn: 'টিআইএন ব্যবস্থাপনা' },
    { en: 'Update taxpayer details', bn: 'করদাতা তথ্য হালনাগাদ' },
  ],
  ffwc: [
    { en: 'Read flood bulletins', bn: 'বন্যা বুলেটিন পড়ুন' },
    { en: 'Check water levels', bn: 'পানির স্তর দেখুন' },
    { en: 'View flood warnings', bn: 'বন্যা সতর্কতা দেখুন' },
  ],
  'fire-service': [
    { en: 'Find emergency information', bn: 'জরুরি তথ্য খুঁজুন' },
    { en: 'Explore public services', bn: 'জনসেবা দেখুন' },
    { en: 'Read safety guidance', bn: 'নিরাপত্তা নির্দেশনা' },
  ],
  hajj: [
    { en: 'Register for Hajj', bn: 'হজ নিবন্ধন করুন' },
    { en: 'Read hajj guidance', bn: 'হজ নির্দেশনা পড়ুন' },
    { en: 'View management updates', bn: 'ব্যবস্থাপনা আপডেট' },
  ],
  iedcr: [
    { en: 'View disease surveillance', bn: 'রোগ নজরদারি দেখুন' },
    { en: 'Read public health updates', bn: 'জনস্বাস্থ্য আপডেট' },
    { en: 'Find research information', bn: 'গবেষণা তথ্য খুঁজুন' },
  ],
  'land-portal': [
    { en: 'Find land information', bn: 'ভূমি তথ্য খুঁজুন' },
    { en: 'Explore digital land services', bn: 'ডিজিটাল ভূমি সেবা' },
    { en: 'Open ministry land links', bn: 'মন্ত্রণালয়ের ভূমি লিংক' },
  ],
  lawjusticediv: [
    { en: 'Read justice administration info', bn: 'বিচার প্রশাসন তথ্য' },
    { en: 'View division notices', bn: 'বিভাগীয় নোটিশ দেখুন' },
    { en: 'Find legal guidance', bn: 'আইন নির্দেশনা খুঁজুন' },
  ],
  ldtax: [
    { en: 'Pay land development tax', bn: 'ভূমি উন্নয়ন কর পরিশোধ' },
    { en: 'Get digital Dakhila', bn: 'ডিজিটাল দাখিলা নিন' },
    { en: 'View tax payment status', bn: 'কর পরিশোধের অবস্থা' },
  ],
  modmr: [
    { en: 'Read disaster preparedness', bn: 'দুর্যোগ প্রস্তুতি পড়ুন' },
    { en: 'Find relief information', bn: 'ত্রাণ তথ্য খুঁজুন' },
    { en: 'View ministry updates', bn: 'মন্ত্রণালয় আপডেট' },
  ],
  moedu: [
    { en: 'Read education policy notices', bn: 'শিক্ষা নীতি নোটিশ' },
    { en: 'Find ministry information', bn: 'মন্ত্রণালয় তথ্য' },
    { en: 'View education updates', bn: 'শিক্ষা আপডেট দেখুন' },
  ],
  mopme: [
    { en: 'Explore primary education programmes', bn: 'প্রাথমিক শিক্ষা কর্মসূচি' },
    { en: 'Read ministry notices', bn: 'মন্ত্রণালয় নোটিশ' },
    { en: 'Find mass education info', bn: 'গণশিক্ষা তথ্য' },
  ],
  mowca: [
    { en: 'Explore women & children programmes', bn: 'মহিলা ও শিশু কর্মসূচি' },
    { en: 'Read policy notices', bn: 'নীতি নোটিশ পড়ুন' },
    { en: 'Find ministry updates', bn: 'মন্ত্রণালয় আপডেট' },
  ],
  mygov: [
    { en: 'Access G2C services', bn: 'জি২সি সেবা নিন' },
    { en: 'Explore G2B services', bn: 'জি২বি সেবা দেখুন' },
    { en: 'Open integrated gov services', bn: 'সমন্বিত সরকারি সেবা' },
  ],
  namjari: [
    { en: 'Apply for land mutation', bn: 'নামজারি আবেদন' },
    { en: 'Track mutation status', bn: 'নামজারি অবস্থা ট্র‍্যাক' },
    { en: 'Follow application steps', bn: 'আবেদনের ধাপ অনুসরণ' },
  ],
  'national-portal': [
    { en: 'Browse ministries', bn: 'মন্ত্রণালয় দেখুন' },
    { en: 'Find digital services', bn: 'ডিজিটাল সেবা খুঁজুন' },
    { en: 'Open government gateways', bn: 'সরকারি গেটওয়ে খুলুন' },
  ],
  'national-university': [
    { en: 'Check exam information', bn: 'পরীক্ষা তথ্য দেখুন' },
    { en: 'View results updates', bn: 'ফলাফল আপডেট দেখুন' },
    { en: 'Find affiliated college info', bn: 'অধিভুক্ত কলেজ তথ্য' },
  ],
  nctb: [
    { en: 'Find curriculum information', bn: 'শিক্ষাক্রম তথ্য' },
    { en: 'Browse textbook publications', bn: 'পাঠ্যপুস্তক প্রকাশনা' },
    { en: 'Read NCTB updates', bn: 'এনসিটিবি আপডেট' },
  ],
  nesco: [
    { en: 'Pay electricity bills', bn: 'বিদ্যুৎ বিল পরিশোধ' },
    { en: 'Manage account services', bn: 'অ্যাকাউন্ট সেবা' },
    { en: 'Access customer portal', bn: 'গ্রাহক পোর্টাল খুলুন' },
  ],
  nid: [
    { en: 'Voter registration', bn: 'ভোটার নিবন্ধন' },
    { en: 'NID correction', bn: 'এনআইডি সংশোধন' },
    { en: 'Download NID copy', bn: 'এনআইডি কপি ডাউনলোড' },
  ],
  pgcb: [
    { en: 'View grid information', bn: 'গ্রিড তথ্য দেখুন' },
    { en: 'Read transmission updates', bn: 'সঞ্চালন আপডেট' },
    { en: 'Find company notices', bn: 'কোম্পানি নোটিশ' },
  ],
  police: [
    { en: 'Find public police information', bn: 'পুলিশ জনতথ্য' },
    { en: 'Access digital police services', bn: 'ডিজিটাল পুলিশ সেবা' },
    { en: 'Read published notices', bn: 'প্রকাশিত নোটিশ পড়ুন' },
  ],
  probashi: [
    { en: 'Read migrant-worker policy', bn: 'প্রবাসী কর্মী নীতি' },
    { en: 'Find overseas employment info', bn: 'বৈদেশিক কর্মসংস্থান তথ্য' },
    { en: 'View ministry services', bn: 'মন্ত্রণালয় সেবা' },
  ],
  rab: [
    { en: 'Read RAB public information', bn: 'র‍্যাব জনতথ্য পড়ুন' },
    { en: 'View published notices', bn: 'প্রকাশিত নোটিশ দেখুন' },
    { en: 'Find official updates', bn: 'অফিসিয়াল আপডেট' },
  ],
  railway: [
    { en: 'Buy intercity tickets', bn: 'আন্তঃনগর টিকিট কিনুন' },
    { en: 'Check train schedules', bn: 'ট্রেন সময়সূচি দেখুন' },
    { en: 'View routes', bn: 'রুট দেখুন' },
  ],
  rjsc: [
    { en: 'Register a company', bn: 'কোম্পানি নিবন্ধন' },
    { en: 'Register a firm', bn: 'ফার্ম নিবন্ধন' },
    { en: 'Access RJSC e-services', bn: 'আরজেএসসি ই-সেবা' },
  ],
  rthd: [
    { en: 'Read roads administration info', bn: 'সড়ক প্রশাসন তথ্য' },
    { en: 'View highway updates', bn: 'মহাসড়ক আপডেট' },
    { en: 'Find division notices', bn: 'বিভাগীয় নোটিশ' },
  ],
  supremecourt: [
    { en: 'Find court information', bn: 'আদালত তথ্য খুঁজুন' },
    { en: 'Read judiciary notices', bn: 'বিচার বিভাগীয় নোটিশ' },
    { en: 'View official updates', bn: 'অফিসিয়াল আপডেট' },
  ],
  surokkha: [
    { en: 'Register for vaccine', bn: 'টিকা নিবন্ধন' },
    { en: 'Check vaccination status', bn: 'টিকার অবস্থা যাচাই' },
    { en: 'Download certificate', bn: 'সনদ ডাউনলোড' },
  ],
  'teachers-portal': [
    { en: 'Register as a teacher', bn: 'শিক্ষক নিবন্ধন' },
    { en: 'Access teacher information', bn: 'শিক্ষক তথ্য নিন' },
    { en: 'Use education digital services', bn: 'শিক্ষা ডিজিটাল সেবা' },
  ],
  'titas-gas': [
    { en: 'Find customer information', bn: 'গ্রাহক তথ্য খুঁজুন' },
    { en: 'Access gas services', bn: 'গ্যাস সেবা নিন' },
    { en: 'View account guidance', bn: 'অ্যাকাউন্ট নির্দেশনা' },
  ],
  tmed: [
    { en: 'Find technical education info', bn: 'কারিগরি শিক্ষা তথ্য' },
    { en: 'Explore madrasah education info', bn: 'মাদরাসা শিক্ষা তথ্য' },
    { en: 'Read division updates', bn: 'বিভাগীয় আপডেট' },
  ],
  ugc: [
    { en: 'Read higher-education guidance', bn: 'উচ্চশিক্ষা নির্দেশনা' },
    { en: 'Find university-related info', bn: 'বিশ্ববিদ্যালয় তথ্য' },
    { en: 'View UGC notices', bn: 'ইউজিসি নোটিশ দেখুন' },
  ],
  vat: [
    { en: 'Register for VAT', bn: 'ভ্যাট নিবন্ধন' },
    { en: 'Use VAT e-services', bn: 'ভ্যাট ই-সেবা নিন' },
    { en: 'Manage VAT account', bn: 'ভ্যাট অ্যাকাউন্ট ব্যবস্থাপনা' },
  ],
  wewb: [
    { en: 'Explore welfare services', bn: 'কল্যাণ সেবা দেখুন' },
    { en: 'Read expatriate guidance', bn: 'প্রবাসী নির্দেশনা' },
    { en: 'Find WEWB updates', bn: 'ডব্লিউইডব্লিউবি আপডেট' },
  ],
  wzpdcl: [
    { en: 'Pay electricity bills', bn: 'বিদ্যুৎ বিল পরিশোধ' },
    { en: 'Manage customer account', bn: 'গ্রাহক অ্যাকাউন্ট' },
    { en: 'Access west-zone services', bn: 'পশ্চিমাঞ্চল সেবা' },
  ],
  'xi-admission': [
    { en: 'Apply for Class 11 admission', bn: 'একাদশ ভর্তি আবেদন' },
    { en: 'Track admission status', bn: 'ভর্তির অবস্থা ট্র‍্যাক' },
    { en: 'Follow college admission steps', bn: 'কলেজ ভর্তির ধাপ' },
  ],
};

function toYaml(caps) {
  const lines = ['capabilities:'];
  for (const c of caps) {
    lines.push(`  - en: ${JSON.stringify(c.en)}`);
    lines.push(`    bn: ${JSON.stringify(c.bn)}`);
  }
  return lines.join('\n');
}

function inject(content, yamlBlock) {
  if (/^capabilities:/m.test(content)) {
    return content.replace(/^capabilities:\n(?:  .*\n)*/m, `${yamlBlock}\n`);
  }
  if (/^icon:/m.test(content)) {
    return content.replace(/^(icon:.*)$/m, `$1\n${yamlBlock}`);
  }
  return content.replace(/^(directory_category_rank:.*)$/m, `$1\n${yamlBlock}`);
}

let ok = 0;
for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith('.md'))) {
  const id = file.replace(/\.md$/, '');
  const caps = CAPABILITIES[id];
  if (!caps) {
    console.error(`Missing capabilities for ${id}`);
    process.exitCode = 1;
    continue;
  }
  if (caps.length < 2 || caps.length > 4) {
    console.error(`Bad count for ${id}: ${caps.length}`);
    process.exitCode = 1;
    continue;
  }
  for (const c of caps) {
    if (c.en.length > 40 || c.bn.length > 48) {
      console.error(`Too long for ${id}:`, c);
      process.exitCode = 1;
    }
  }
  const full = path.join(DIR, file);
  const next = inject(fs.readFileSync(full, 'utf8'), toYaml(caps));
  fs.writeFileSync(full, next);
  ok += 1;
}
console.log(`Seeded capabilities on ${ok} services`);
