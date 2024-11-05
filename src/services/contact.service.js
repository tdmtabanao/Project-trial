// import axios from 'axios';

const ContactService = () => {
  /**
   * @param {object} input The form data to be submitted.
   * @returns `true` if submission was successful, otherwise `false`
   */
  const submitContactForm = async (input) => {
    console.log("Handling Contact Form submission...", input);

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    return true;
  };

  return { submitContactForm };
};

const service = ContactService();

export default service;
