/** Public contact details, shared by the header, contact section and footer. */
export const contactChannels = [
 {id:'telegram',label:'Telegram',href:'https://t.me/svetaserm',priority:'primary'},
 {id:'max',label:'MAX',href:import.meta.env.VITE_MAX_URL || 'https://max.ru/u/f9LHodD0cOJ0FxVeVnfPc8fRCDbfc4_qlGKgvHi0otZL0uaO9ZvHGWYwaXY',priority:'secondary'},
 {id:'avito',label:'Авито',href:import.meta.env.VITE_AVITO_URL || 'https://www.avito.ru/brands/c5dac924d59200c011d20fed2ea7e4dd',priority:'secondary'},
 {id:'whatsapp',label:'WhatsApp',href:import.meta.env.VITE_WHATSAPP_URL || 'https://wa.me/79607001308',priority:'quiet'},
 {id:'email',label:'Почта',href:`mailto:${import.meta.env.VITE_EMAIL || 'Smoiseeva939@gmail.com'}`,priority:'quiet'},
] as const;
