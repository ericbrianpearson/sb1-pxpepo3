import React from 'react';
import { Shield, Building2, Building } from 'lucide-react';
import { Plan } from '../types/subscription';

const plans: Plan[] = [
  {
    id: 'personal',
    name: 'Personal',
    price: 10,
    features: [
      'AI-powered email scanning',
      'Real-time threat detection',
      'Up to 1,000 emails/month',
      'Basic support',
      'Single Gmail account'
    ],
    buttonText: 'Subscribe Now',
    recommended: true
  },
  {
    id: 'business',
    name: 'Business',
    price: 29,
    features: [
      'Everything in Personal',
      'Up to 10,000 emails/month',
      'Priority support',
      'Multiple email accounts',
      'Advanced analytics'
    ],
    buttonText: 'Start Free Trial'
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 0,
    features: [
      'Custom email volume',
      'Dedicated support',
      'Custom AI models',
      'API access',
      'SLA guarantee'
    ],
    buttonText: 'Contact Sales'
  }
];

const PlanIcon = ({ planId }: { planId: string }) => {
  switch (planId) {
    case 'personal':
      return <Shield className="w-6 h-6" />;
    case 'business':
      return <Building2 className="w-6 h-6" />;
    case 'enterprise':
      return <Building className="w-6 h-6" />;
    default:
      return null;
  }
};

export const PricingSection: React.FC = () => {
  const handlePlanSelect = (plan: Plan) => {
    if (plan.id === 'enterprise') {
      window.location.href = 'mailto:sales@emailsanitizer.com?subject=Enterprise%20Plan%20Inquiry';
    } else {
      // TODO: Implement Stripe integration
      console.log('Selected plan:', plan.id);
    }
  };

  return (
    <div className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-3 text-xl text-gray-300 sm:mt-4">
            Choose the plan that best fits your needs
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg shadow-lg divide-y divide-gray-700 
                ${plan.recommended 
                  ? 'border-2 border-blue-500 bg-gray-800' 
                  : 'border border-gray-700 bg-gray-800/50'}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <PlanIcon planId={plan.id} />
                    <h3 className="ml-3 text-xl font-semibold text-white">
                      {plan.name}
                    </h3>
                  </div>
                  {plan.recommended && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white">
                      Recommended
                    </span>
                  )}
                </div>

                <p className="mt-8">
                  {plan.id === 'enterprise' ? (
                    <span className="text-4xl font-extrabold text-white">
                      Custom
                    </span>
                  ) : (
                    <>
                      <span className="text-4xl font-extrabold text-white">
                        ${plan.price}
                      </span>
                      <span className="text-base font-medium text-gray-300">
                        /mo
                      </span>
                    </>
                  )}
                </p>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex text-gray-300">
                      <Shield className="flex-shrink-0 w-5 h-5 text-blue-400" />
                      <span className="ml-3">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-6 pt-6 pb-8">
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white 
                    ${plan.recommended 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : 'bg-gray-700 hover:bg-gray-600'} 
                    transition-colors duration-200`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};