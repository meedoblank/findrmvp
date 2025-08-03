import { useState } from 'react';
import Head from 'next/head';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}
