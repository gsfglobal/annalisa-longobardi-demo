/**
 * Ready for the AI assistants (Dental Go). Nothing is active in this demo.
 * When the integrations exist: set `enabled: true` and configure the endpoints with environment variables
 * (never hardcoded keys). The AI must not give individual clinical advice.
 */
export const integrations = {
  whatsappAssistant: {
    enabled: false,
    // e.g. WhatsApp Business Platform → number already published on the site
    number: "393358410578",
    scope: ["orari", "sedi", "richieste appuntamento", "passaggio a operatore umano"],
  },
  phoneAssistant: {
    enabled: false,
    scope: ["informazioni amministrative", "richieste appuntamento", "inoltro al personale"],
  },
} as const;
