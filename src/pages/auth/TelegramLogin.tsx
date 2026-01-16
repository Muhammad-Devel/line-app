// components/auth/TelegramLogin.tsx
import { useEffect } from "react";

export const TelegramLogin = () => {
  useEffect(() => {
    (window as any).TelegramLoginWidget = {
      dataOnauth: (user: any) => {
        console.log("Telegram user:", user);
      },
    };
  }, []);

  return (
    <script
      async
      src="https://telegram.org/js/telegram-widget.js?22"
      data-telegram-login="line_app_bot"
      data-size="large"
      data-radius="8"
      data-request-access="write"
      data-userpic="true"
      data-onauth="TelegramLoginWidget.dataOnauth(user)"
    />
  );
};
