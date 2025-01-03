import React, { useEffect, useRef, useState } from 'react'
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'

const Contact = ({ portfolio }) => {
  const [leftInView, setLeftInView] = useState(false);
  const [rightInView, setRightInView] = useState(false);

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  // IntersectionObserver logic to detect when the left and right divs are in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.target === leftRef.current && entry.isIntersecting) {
          setLeftInView(true);
        }
        if (entry.target === rightRef.current && entry.isIntersecting) {
          setRightInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);

    return () => {
      if (leftRef.current) observer.unobserve(leftRef.current);
      if (rightRef.current) observer.unobserve(rightRef.current);
    };
  }, []);

  return (
    <div className='min-h-[80vh] py-20 relative z-10' id='contact'>
      <h3 className='text-5xl uppercase text-center tracking-wide shadow-xl'>Contact</h3>
      <h5 className='text-3xl text-center shadow-xl text-gray-800 mt-5'>
        LET'S <span className='caveat text-white'>Have Some Talk</span>
      </h5>

      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 text-gray-200 p-8 rounded-lg shadow-xl w-full max-w-5xl mx-auto">
        {/* Left Side */}
        <div
          ref={leftRef}
          className={`flex flex-col gap-6 w-full lg:w-1/2 transition-opacity duration-700 ${leftInView ? 'opacity-100' : 'opacity-0'}`}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Contact Information</h2>
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-gray-700 text-2xl" />
            <p className="text-lg caveat font-bold">{portfolio.address}</p>
          </div>
          <div className="flex items-start gap-4">
            <FaEnvelope className="text-gray-700 text-2xl" />
            <p className="text-lg caveat font-bold">{portfolio.email}</p>
          </div>
          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-gray-700 text-2xl" />
            <p className="text-lg caveat font-bold">{portfolio.phone}</p>
          </div>
        </div>

        {/* Right Side */}
        <div
          ref={rightRef}
          className={`w-full lg:w-1/2 p-6 rounded-lg shadow-lg transition-opacity duration-700 ${rightInView ? 'opacity-100' : 'opacity-0'}`}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
          <form action="" className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white placeholder-gray-400 focus:outline-none focus:border-b focus:border-b-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white placeholder-gray-400 focus:outline-none focus:border-b focus:border-b-blue-500"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 text-white placeholder-gray-400 focus:outline-none focus:border-b focus:border-b-blue-500"
            ></textarea>
            <button
              type="button"
              className="px-6 py-3 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-300 font-medium text-lg rounded-lg shadow-lg hover:from-gray-600 hover:to-gray-800 hover:shadow-xl transition-all duration-300 border border-none"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <p className='text-9xl absolute left-[50%] translate-x-[-50%] text-nowrap opacity-10 caveat'>Contact</p>
    </div>
  );
};

export default Contact;
