import { useState, useEffect } from 'react';
import { CopyIcon, Loader2 } from 'lucide-react';
import axios from 'axios';
const data = localStorage.getItem('user-info');
const token = JSON.parse(data)?.token;

export default function ApiKeyView() {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiStats, setApiStats] = useState();
  const [isLoading, setIsLoading] = useState(true);

  async function getApiKeyStats() {
    setIsLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/api_key`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      console.log(response?.data?.usedSpace)
      const usedInMB = parseFloat((response?.data?.usedSpace / (1024 * 1024)));
      console.log(usedInMB)
      const obj = {
        key: response?.data?.key,
        usage: {
          totalRequests: response?.data?.requestCount,
          bandwidthUsed: `${usedInMB} MB`,
        }
      }
      setApiStats(obj)
      // console.log(response);
    }
    catch (err) {
      console.log("Error in getting API Object", err.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getApiKeyStats();
  }, [])

  const displayKey = apiStats?.key ? (showKey
    ? apiStats.key
    : apiStats.key.substring(0, 5) +
    '•'.repeat(apiStats.key.length - 10) +
    apiStats.key.substring(apiStats.key.length - 5)) : '••••••••••••••••';

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiStats?.key);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Parse memory used and calculate percentage (assume max is 5 GB)
  const usedValue = apiStats ? parseFloat(apiStats.usage.bandwidthUsed.split(' ')[0]) : 0;
  const maxValue = 5 * 1024;
  const percentUsed = Math.min((usedValue / maxValue) * 100, 100).toFixed(1);

  return (
    <div className="p-8 w-full mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200">
          <h3 className="font-bold text-lg text-black-700">Your API Key</h3>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm text-gray-600">API Key</label>
              {!isLoading && (
                <button
                  onClick={() => setShowKey(!showKey)}
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  {showKey ? 'Hide' : 'Show'}
                </button>
              )}
            </div>

            <div className="flex items-center border rounded-lg overflow-hidden">
              <div className={`flex-1 px-4 py-2 bg-gray-50 font-mono text-sm text-gray-800 whitespace-nowrap overflow-x-auto ${isLoading ? 'animate-pulse' : ''}`}>
                {isLoading ? (
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                ) : (
                  displayKey
                )}
              </div>
              <button
                onClick={copyApiKey}
                disabled={isLoading}
                className={`flex items-center justify-center px-4 py-2 bg-purple-100 hover:bg-purple-200 transition-colors text-sm font-medium text-purple-700 border-l border-gray-300 ${copied ? 'animate-pulse' : ''} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {copied ? 'Copied!' : <CopyIcon size={16} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xs text-gray-500 mb-1">Total API Requests</div>
              {isLoading ? (
                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
              ) : (
                <div className="text-lg font-bold text-gray-800">
                  {apiStats?.usage.totalRequests.toLocaleString()}
                </div>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xs text-gray-500 mb-2">Memory Usage (of 1 GB)</div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                {isLoading ? (
                  <div className="bg-gray-300 h-4 rounded-full w-1/3 animate-pulse"></div>
                ) : (
                  <div
                    className="bg-blue-600 h-4 rounded-full transition-all"
                    style={{ width: `${percentUsed}%` }}
                  ></div>
                )}
              </div>
              {isLoading ? (
                <div className="h-4 bg-gray-200 rounded w-32 mt-1 animate-pulse"></div>
              ) : (
                <div className="text-sm mt-1 text-gray-700 font-medium">
                  {apiStats?.usage.bandwidthUsed} ({percentUsed}% used)
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}