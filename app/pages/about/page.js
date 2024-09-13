import React from "react";

function AboutUs() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-12">
      <div className="max-w-4xl w-full px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-center mb-8 text-gray-600">
          Welcome to InvestEdge, the innovative blockchain-based crowdfunding
          platform that empowers individuals and organizations to turn their
          ideas into reality. Our mission is to democratize investment
          opportunities and provide a transparent, secure environment for
          fundraising.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              At InvestEdge, our mission is to create a fair and inclusive
              platform where anyone can support innovative projects and
              contribute to groundbreaking ideas. We are committed to leveraging
              blockchain technology to ensure transparency and accountability in
              all fundraising activities.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-600">
              Our vision is to revolutionize the crowdfunding landscape by
              utilizing smart contracts and blockchain technology to streamline
              the process, reduce fraud, and enhance security. We aim to build a
              global community of investors and creators who are passionate
              about making a positive impact.
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Technology
          </h2>
          <p className="text-gray-600">
            InvestEdge is powered by cutting-edge blockchain technology. Our
            platform utilizes smart contracts to automate and secure
            transactions, ensuring that every contribution is tracked and
            managed with the highest level of transparency. We leverage Ethereum
            and other blockchain solutions to provide a seamless and trustworthy
            experience for both fundraisers and backers.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Meet the Team
          </h2>
          <p className="text-gray-600">
            Our team consists of passionate individuals with diverse backgrounds
            in technology, finance, and entrepreneurship. We are dedicated to
            building a platform that supports and uplifts innovative ideas.
            Together, we work tirelessly to ensure that InvestEdge remains at
            the forefront of blockchain-based crowdfunding.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
