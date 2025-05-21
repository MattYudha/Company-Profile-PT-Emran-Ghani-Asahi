import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../utils/translations';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '../utils/validation';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would typically send the data to your backend
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulated API call
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: t.address,
      details: "123 Business Avenue, Tokyo, Japan"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: t.phone,
      details: "+81 3-1234-5678"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: t.email,
      details: "info@emranghanisahi.com"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: t.hours,
      details: t.businessHours
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.getInTouch}
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-lg">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((item, index) => (
              <div 
                key={index}
                className="flex items-start bg-gray-50 dark:bg-gray-700 p-6 rounded-lg transition-transform hover:translate-y-[-5px]"
              >
                <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-full mr-4">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.details}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-700 p-8 rounded-lg shadow-md">
            {submitted && (
              <div className="bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 text-green-700 dark:text-green-300 p-4 mb-6 rounded">
                <p className="font-semibold">{t.messageSent}</p>
                <p>{t.messageConfirmation}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                    {t.yourName} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white ${
                      errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder={t.namePlaceholder}
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                    {t.yourEmail} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white ${
                      errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder={t.emailPlaceholder}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2">
                  {t.subject} <span className="text-red-500">*</span>
                </label>
                <select
                  id="subject"
                  {...register('subject')}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white ${
                    errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <option value="">{t.selectSubject}</option>
                  <option value="quote">{t.requestQuote}</option>
                  <option value="info">{t.generalInquiry}</option>
                  <option value="support">{t.supportRequest}</option>
                  <option value="partnership">{t.partnership}</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-red-500 text-sm">{errors.subject.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
                  {t.message} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder={t.messagePlaceholder}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center justify-center w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-300 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.sending}
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    {t.sendMessage}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;