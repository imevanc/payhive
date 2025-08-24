"use client";

import React, {useEffect, useRef} from 'react';
import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  DoughnutController,
  Filler,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  PolarAreaController,
  RadialLinearScale,
  Title,
  Tooltip
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    BarController,
    LineController,
    DoughnutController,
    PolarAreaController
);

// Chart Components
const BarChart = ({ width = 300, height = 200 }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new ChartJS(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Revenue',
            data: [12000, 15000, 8000, 18000, 12000, 14000],
            backgroundColor: 'rgba(34, 197, 94, 0.6)',
            borderColor: 'rgba(34, 197, 94, 1)',
            borderWidth: 1
          }, {
            label: 'Expenses',
            data: [4000, 6000, 3000, 7000, 4500, 5200],
            backgroundColor: 'rgba(239, 68, 68, 0.6)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                font: {
                  size: 10
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 10
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

const LineChart = ({ width = 300, height = 200 }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [{
            label: 'Transactions',
            data: [25, 32, 28, 35],
            borderColor: 'rgba(59, 130, 246, 1)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'rgba(59, 130, 246, 1)',
            pointBorderColor: 'white',
            pointBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                font: {
                  size: 10
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 10
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

const DoughnutChart = ({ width = 200, height = 200 }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new ChartJS(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Paid', 'Pending', 'Overdue'],
          datasets: [{
            data: [65, 25, 10],
            backgroundColor: [
              'rgba(34, 197, 94, 0.8)',
              'rgba(251, 191, 36, 0.8)',
              'rgba(239, 68, 68, 0.8)'
            ],
            borderColor: [
              'rgba(34, 197, 94, 1)',
              'rgba(251, 191, 36, 1)',
              'rgba(239, 68, 68, 1)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          cutout: '70%'
        }
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

const AreaChart = ({ width = 300, height = 200 }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Cash In',
            data: [8000, 12000, 6000, 15000, 9000, 11000],
            borderColor: 'rgba(34, 197, 94, 1)',
            backgroundColor: 'rgba(34, 197, 94, 0.2)',
            fill: true,
            tension: 0.4
          }, {
            label: 'Cash Out',
            data: [5000, 7000, 4000, 9000, 6000, 7500],
            borderColor: 'rgba(239, 68, 68, 1)',
            backgroundColor: 'rgba(239, 68, 68, 0.2)',
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                font: {
                  size: 10
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 10
                }
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

const PolarChart = ({ width = 200, height = 200 }) => {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new ChartJS(ctx, {
        type: 'polarArea',
        data: {
          labels: ['Create Invoice', 'Record Expense', 'Add Client', 'Generate Report'],
          datasets: [{
            data: [30, 25, 20, 25],
            backgroundColor: [
              'rgba(34, 197, 94, 0.7)',
              'rgba(59, 130, 246, 0.7)',
              'rgba(251, 191, 36, 0.7)',
              'rgba(168, 85, 247, 0.7)'
            ],
            borderColor: [
              'rgba(34, 197, 94, 1)',
              'rgba(59, 130, 246, 1)',
              'rgba(251, 191, 36, 1)',
              'rgba(168, 85, 247, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            r: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              ticks: {
                display: false
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default function DashboardPage() {
  return (
      <main className="bg-white min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-8xl mx-auto">
            <div className="mb-16">
              <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Your Business Dashboard
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Welcome back,
                <span className="block text-green-700">Sarah</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl">
                Here is an overview of your business performance and recent
                activity
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
              <div className="relative lg:col-span-3">
                <div className="absolute inset-0 rounded-lg bg-gray-50 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)] lg:rounded-tl-[calc(2rem+1px)]">
                  <div className="h-96 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-8">
                    <BarChart />
                  </div>
                  <div className="px-10 py-5 pt-6">
                    <h3 className="text-sm/4 font-semibold text-green-600">
                      Monthly Overview
                    </h3>
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                      Revenue & Expenses
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                      Track your monthly performance with detailed revenue and
                      expense analytics.
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-lg shadow outline outline-1 outline-black/5 max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]" />
              </div>

              <div className="relative lg:col-span-3">
                <div className="absolute inset-0 rounded-lg bg-gray-50 lg:rounded-tr-[2rem]" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-tr-[calc(2rem+1px)]">
                  <div className="h-96 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8">
                    <LineChart />
                  </div>
                  <div className="px-10 py-5 pt-6">
                    <h3 className="text-sm/4 font-semibold text-blue-900">
                      Recent Activity
                    </h3>
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                      Latest Transactions
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                      View and categorize your most recent business transactions
                      and payments.
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-lg shadow outline outline-1 outline-black/5 lg:rounded-tr-[2rem]" />
              </div>

              <div className="relative lg:col-span-2">
                <div className="absolute inset-0 rounded-lg bg-gray-50 lg:rounded-bl-[2rem]" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-bl-[calc(2rem+1px)]">
                  <div className="h-96 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-8">
                    <DoughnutChart />
                  </div>
                  <div className="px-10 py-5 pt-6">
                    <h3 className="text-sm/4 font-semibold text-green-600">
                      Invoices
                    </h3>
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                      Pending & Paid
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                      Manage outstanding invoices and track payment status.
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-lg shadow outline outline-1 outline-black/5 lg:rounded-bl-[2rem]" />
              </div>

              <div className="relative lg:col-span-2">
                <div className="absolute inset-0 rounded-lg bg-gray-50" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                  <div className="h-96 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8">
                    <AreaChart />
                  </div>
                  <div className="px-10 py-5 pt-6">
                    <h3 className="text-sm/4 font-semibold text-blue-600">
                      Cash Flow
                    </h3>
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                      Money in & out
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                      Monitor your business cash flow and forecast future trends.
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-lg shadow outline outline-1 outline-black/5" />
              </div>

              <div className="relative lg:col-span-2">
                <div className="absolute inset-0 rounded-lg bg-gray-50 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-br-[calc(2rem+1px)]">
                  <div className="h-96 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-8">
                    <PolarChart />
                  </div>
                  <div className="px-10 py-5 pt-6">
                    <h3 className="text-sm/4 font-semibold text-green-600">
                      Quick Actions
                    </h3>
                    <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                      Common tasks
                    </p>
                    <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                      Access frequently used features and create new records
                      quickly.
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-lg shadow outline outline-1 outline-black/5 max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200 mt-16">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Business Health
                </h3>
                <div className="text-sm text-gray-500">This Month</div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">£12,450</div>
                  <div className="text-sm text-gray-600">Total Revenue</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-900">£3,890</div>
                  <div className="text-sm text-gray-600">Expenses</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">£8,560</div>
                  <div className="text-sm text-gray-600">Net Profit</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">87</div>
                  <div className="text-sm text-gray-600">Transactions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}