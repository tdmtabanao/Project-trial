// import axios from 'axios';

const CheckoutService = () => {
  /**
   * @param {object} input The form data to be submitted.
   * @returns `true` if submission was successful, otherwise `false`
   */
  const submitCheckoutForm = async (input) => {
    
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    return true;
  };

  return { submitCheckoutForm };
};

const service = CheckoutService();

export default service;
