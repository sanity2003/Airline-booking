import React, { useEffect, useRef } from 'react';

const Chatbot = () => {
  const messengerRef = useRef(null); // Ref to hold the messenger element
  const initialized = useRef(false); // Ref to track if initialization happened

  useEffect(() => {
    // Prevent running initialization more than once
    if (initialized.current) {
      return;
    }
    initialized.current = true; // Mark as initialized

    console.log("Initializing Dialogflow Messenger...");

    // Function to load the script
    const loadScript = () => {
      const script = document.createElement('script');
      script.id = 'dialogflow-script';
      script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
         console.log("Dialogflow script loaded.");
         addMessengerElement(); // Add the element AFTER the script is loaded
      }
      script.onerror = () => {
         console.error("Failed to load Dialogflow script.");
      }
    };

    // Function to add the df-messenger element
    const addMessengerElement = () => {
      // Check if element already exists (double safety)
      if (document.querySelector('df-messenger')) {
         console.warn("df-messenger element already exists.");
         return;
      }
      const messenger = document.createElement('df-messenger');
      messenger.setAttribute('intent', 'WELCOME');
      messenger.setAttribute('chat-title', 'SkyBookSupportAgent');
      messenger.setAttribute('agent-id', '04981296-ee34-430e-ad72-4ebd220f7acc'); 
      messenger.setAttribute('language-code', 'en');
      document.body.appendChild(messenger);
      messengerRef.current = messenger; 
      console.log("df-messenger element added.");
    };

    // Check if script already exists before adding
    if (!document.getElementById('dialogflow-script')) {
      loadScript();
    } else {
       // If script exists but element might not (e.g., fast refresh removed it)
       addMessengerElement();
    }


    
    return () => {
      console.log("Cleaning up Dialogflow Messenger...");
      initialized.current = false; // Reset for potential fast refresh in dev
      const dfScript = document.getElementById('dialogflow-script');
      
      const dfMessenger = messengerRef.current || document.querySelector('df-messenger');

      
      if (dfMessenger && dfMessenger.parentNode === document.body) {
        document.body.removeChild(dfMessenger);
        messengerRef.current = null;
         console.log("df-messenger element removed.");
      }
      // Only remove script if necessary - sometimes causes issues on fast refresh
      // if (dfScript && dfScript.parentNode === document.body) {
      //   document.body.removeChild(dfScript);
      //   console.log("Dialogflow script removed.");
      // }
    };

  }, []); 

  return null; // This component doesn't render anything itself
};

export default Chatbot;