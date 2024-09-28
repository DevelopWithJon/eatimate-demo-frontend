'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReportHighlight from '@components/ReportHighlight';
import Formatter from '@lib/formatterClass';
import { LineChart, DonutChart } from '@lib/chart';

const Page = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchReport = async () => {
        const response = await fetch(`/api/reports/${id}`);
        const data = await response.json();
        setReport(data);
      };
      fetchReport();
    }
  }, [id]);

  // Helper function to create full address
  const createFullAddress = (report) => {
    const { address, city, state, zip } = report;
    const parts = [];

    if (address) parts.push(address);
    if (city) parts.push(city);
    if (state) parts.push(state);
    if (zip) parts.push(zip);

    return parts.join(', ').replace(/, $/, ''); // Remove trailing comma if necessary
  };

  // Function to generate first year's total projections
  const generateProjections = (report) => {
    if (!report) return {};

    return {
      acquisitionCosts: report.listing_price || 0,
      capitalizationRate: report.year_one_cap ? report.year_one_cap : 'N/A',
      annualCashflow: (report.all_revenue && report.all_revenue[0]) || 0,
      cashOnCashReturn:
        report.all_cash_on_cash && report.all_cash_on_cash[0]
          ? report.all_cash_on_cash[0]
          : 'N/A',
    };
  };

  // Helper function for formatting expenses
  const formatExpenses = (report) => {
    const labelMap = {
      all_insurance: 'Insurance',
      all_water: 'Water',
      all_electricity: 'Electricity',
      all_RM: 'Rental Management',
      all_vacancy: 'Vacancy',
      all_management: 'Management',
      all_HOA: 'HOA',
      all_utilities: 'Utilities',
      all_gas: 'Gas',
      all_total_loan_payment: 'Mortgage Payment',
    };

    const result = [];

    Object.keys(labelMap).forEach((key) => {
      // Check if the property exists, has at least one value, and is not zero
      if (report[key] && report[key].length > 0 && report[key][0] > 0) {
        let value = report[key][0];

        value = value / 12;

        result.push({
          label: labelMap[key],
          value: value,
        });
      }
    });

    return result;
  };

  let projections = report ? generateProjections(report) : {};
  const formattedExpenses = report ? formatExpenses(report) : [];

  return (
    <div className='h-full w-full bg-[#F1F2F2] p-3'>
      <div className='h-min-full flex w-full flex-col items-center rounded-lg bg-[#FAFAFA] p-3 shadow-lg'>
        {/* Header */}
        <div className='mt-5 w-fit text-center'>
          <h1 className='text-5xl text-light-accent'>EstiMate</h1>
          <p className='text-2xl'>Real Estate Investment Calculator</p>
        </div>

        {report ? (
          <div className='h-fit w-fit'>
            {/* Address and Download Buttons */}
            <div className='mt-5 flex flex-row items-center justify-center gap-8'>
              <p className='text-xl font-bold'>{createFullAddress(report)}</p>
              <div className='flex flex-row gap-4'>
                <button className='rounded-md bg-light-primary px-3 py-2 text-lg text-white hover:bg-light-primary_light'>
                  Download Excel Report
                </button>
                <button className='rounded-md bg-light-primary px-3 py-2 text-lg text-white hover:bg-light-primary_light'>
                  Download PDF Report
                </button>
              </div>
            </div>
            {/* Highlight Stats Section */}
            <div className='mt-5 flex flex-row justify-center gap-4'>
              <ReportHighlight
                title={'Acquisition Costs'}
                value={Formatter.formatUSD(projections.acquisitionCosts)}
              />
              <ReportHighlight
                title={'Capitalization Rate'}
                value={Formatter.formatPercentage(
                  projections.capitalizationRate
                )}
              />
              <ReportHighlight
                title={'Annual Cashflow'}
                value={Formatter.formatUSD(projections.annualCashflow)}
              />
              <ReportHighlight
                title={'Cash on Cash Return'}
                value={Formatter.formatPercentage(projections.cashOnCashReturn)}
              />
            </div>

            {/* Financial Projections Chart */}
            <div className='mt-5 h-fit w-full rounded-lg bg-[#E0F2FE] p-3 shadow-lg'>
              <p className='w-full text-start text-lg font-semibold'>
                Financial Analysis Over Time
              </p>
              <LineChart
                data={{
                  title: '',
                  datasets: [
                    {
                      name: 'Loan Balance',
                      values: report.all_total_loan_payment,
                    },
                    { name: 'Income', values: report.all_revenue },
                    { name: 'Expenses', values: report.all_total_expenses },
                  ],
                }}
              />
            </div>

            {/* Cost Breakdown */}
            <div className='mt-5 flex h-full w-full flex-col gap-3 p-3'>
              <p className='w-full text-start text-lg font-semibold'>
                Cost Breakdown
              </p>
              <div className='flex flex-row gap-3'>
                <div className='h-full w-fit'>
                  {formattedExpenses ? (
                    <div className='flex h-fit w-fit flex-col items-center rounded-lg border-2 border-[#D9D9D9] bg-[#FAFAFA] p-3 text-start shadow-lg'>
                      <DonutChart data={formattedExpenses} />
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className='h-full w-full rounded-lg border-2 border-[#D9D9D9] bg-[#FAFAFA] p-3 shadow-lg'>
                  <p>Amortization Schedule</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          'Loading Report...'
        )}
      </div>
    </div>
  );
};

export default Page;
