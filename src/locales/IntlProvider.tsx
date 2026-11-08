import React from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";
import { db } from "../db/state";
import { useValue } from "../lib/db/react";
import { messages } from "./locales";

const IntlProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const locale = useValue(db, "locale");

  // fallbackOnEmptyString={false}: an empty translation ("") renders as empty
  // text, instead of falling back to the English defaultMessage.
  // This allows translations to deliberately hide a word, e.g. Polish
  // "plugins.timeTracker.isIn" is "" because the relative time ("za 5 dni")
  // already reads naturally without a verb.
  return (
    <ReactIntlProvider
      locale={locale}
      messages={messages[locale]}
      fallbackOnEmptyString={false}
    >
      {children}
    </ReactIntlProvider>
  );
};

export default IntlProvider;
