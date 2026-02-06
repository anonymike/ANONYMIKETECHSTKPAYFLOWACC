'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpRight, ArrowDownLeft, Calendar, TrendingUp, Loader2, Trash2, Filter, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
  id: string;
  user_phone: string;
  amount: number;
  type: 'send' | 'receive';
  status: 'pending' | 'success' | 'failed';
  description: string;
  created_at: string;
}

interface TransactionHistoryProps {
  userPhone?: string;
}

type PeriodFilter = 'all' | 'week' | 'month';

export function TransactionHistory({ userPhone: initialUserPhone }: TransactionHistoryProps) {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('all');
  const [queryPhone, setQueryPhone] = useState('');
  const [showPhoneInput, setShowPhoneInput] = useState(true);

  // Load saved phone from localStorage on mount
  useEffect(() => {
    const savedPhone = localStorage.getItem('transactionQueryPhone');
    const initialPhone = initialUserPhone || savedPhone || '';
    
    setQueryPhone(initialPhone);
    if (initialPhone) {
      setShowPhoneInput(false);
    }
  }, [initialUserPhone]);
  const userPhone = initialUserPhone; // Declare the userPhone variable

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!queryPhone) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/transactions?phone=${encodeURIComponent(queryPhone)}`);
        const data = await response.json();

        if (response.ok) {
          setTransactions(data.data || []);
          setError('');
          // Save phone to localStorage for persistence
          localStorage.setItem('transactionQueryPhone', queryPhone);
        } else {
          setError(data.error || 'Failed to load transactions');
          toast({
            title: 'Error Loading Transactions',
            description: data.error || 'Failed to load transactions',
            variant: 'destructive',
          });
        }
      } catch (err) {
        setError('Failed to load transactions');
        toast({
          title: 'Connection Error',
          description: 'Failed to load transactions. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [queryPhone, toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-emerald-600 bg-emerald-50';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'failed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return '✓';
      case 'pending':
        return '⏳';
      case 'failed':
        return '✕';
      default:
        return '?';
    }
  };

  const getTotalAmount = () => {
    return getFilteredTransactions().reduce((sum, txn) => sum + txn.amount, 0);
  };

  const getSuccessCount = () => {
    return getFilteredTransactions().filter((txn) => txn.status === 'success').length;
  };

  const getFilteredTransactions = (): Transaction[] => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return transactions.filter((txn) => {
      const txnDate = new Date(txn.created_at);

      switch (periodFilter) {
        case 'week': {
          const startOfWeek = new Date(startOfDay);
          startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
          return txnDate >= startOfWeek;
        }
        case 'month': {
          const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          return txnDate >= startOfMonth;
        }
        case 'all':
        default:
          return true;
      }
    });
  };

  const handleClearTransactions = async () => {
    if (!queryPhone) return;

    setDeleting(true);
    try {
      const response = await fetch('/api/transactions/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: queryPhone }),
      });

      const data = await response.json();

      if (response.ok) {
        setTransactions([]);
        setShowDeleteConfirm(false);
        toast({
          title: 'Success',
          description: 'All transactions have been deleted successfully.',
        });
      } else {
        const errorMsg = data.error || 'Failed to clear transactions';
        setError(errorMsg);
        toast({
          title: 'Error',
          description: errorMsg,
          variant: 'destructive',
        });
      }
    } catch (err) {
      const errorMsg = 'Failed to clear transactions';
      setError(errorMsg);
      toast({
        title: 'Connection Error',
        description: errorMsg,
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryPhone(e.target.value);
  };

  const handleClearSearch = () => {
    setQueryPhone('');
    setShowPhoneInput(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Phone Input for Query */}
      {showPhoneInput && (
        <Card className="bg-gradient-to-br from-cyan-50/40 to-blue-50/40 border-cyan-200">
          <CardHeader>
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Search className="w-4 h-4 text-primary" />
              Search Transactions by Phone
            </CardTitle>
            <CardDescription>Enter a phone number to view transaction history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., +254708374149"
                value={queryPhone}
                onChange={handlePhoneChange}
                className="flex-1"
              />
              {queryPhone && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearSearch}
                >
                  Clear
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              You can search transactions for any phone number in the system.
            </p>
          </CardContent>
        </Card>
      )}
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50/40 to-blue-100/40 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-900">
              {periodFilter === 'week' ? 'Weekly' : periodFilter === 'month' ? 'Monthly' : 'Total'} Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{getFilteredTransactions().length}</div>
            <p className="text-xs text-blue-700 mt-1">
              {periodFilter === 'week' ? 'This week' : periodFilter === 'month' ? 'This month' : 'All-time'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50/40 to-emerald-100/40 border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-900">Successful</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{getSuccessCount()}</div>
            <p className="text-xs text-emerald-700 mt-1">Completed payments</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50/40 to-amber-100/40 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-900">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">KES {getTotalAmount().toLocaleString()}</div>
            <p className="text-xs text-amber-700 mt-1">
              {periodFilter === 'week' ? 'This week' : periodFilter === 'month' ? 'This month' : 'All-time'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions List */}
      <Card className="bg-gradient-to-br from-blue-50/40 via-purple-50/30 to-pink-50/40 backdrop-blur-sm border-white/20">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              Transaction History
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {getFilteredTransactions().length > 0
                ? `Showing ${getFilteredTransactions().length} ${periodFilter === 'week' ? 'weekly' : periodFilter === 'month' ? 'monthly' : 'all'} transactions`
                : 'No transactions yet'}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={periodFilter === 'week' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriodFilter('week')}
              className="text-xs"
            >
              Week
            </Button>
            <Button
              variant={periodFilter === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriodFilter('month')}
              className="text-xs"
            >
              Month
            </Button>
            <Button
              variant={periodFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriodFilter('all')}
              className="text-xs"
            >
              All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm mb-4">
              {error}
            </div>
          )}

          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground mb-2">No transactions yet</p>
              <p className="text-xs text-muted-foreground">Your transaction history will appear here</p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between p-4 bg-white/50 hover:bg-white/80 rounded-lg border border-gray-200 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${getStatusColor(txn.status)}`}>
                      {txn.type === 'send' ? (
                        <ArrowUpRight className="w-5 h-5 text-red-600" />
                      ) : (
                        <ArrowDownLeft className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{txn.user_phone}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(txn.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-lg ${txn.type === 'send' ? 'text-red-600' : 'text-green-600'}`}>
                      {txn.type === 'send' ? '-' : '+'}KES {txn.amount.toLocaleString()}
                    </p>
                    <div className={`flex items-center justify-end gap-1 text-xs mt-1 ${getStatusColor(txn.status)}`}>
                      <span>{getStatusIcon(txn.status)}</span>
                      <span className="capitalize">{txn.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(txn.created_at).toLocaleDateString()} {new Date(txn.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowDeleteConfirm(false)} />
          <Card className="border w-full max-w-sm shadow-2xl relative z-10">
            <CardHeader>
              <CardTitle className="text-red-600">Clear All Transactions</CardTitle>
              <CardDescription>This action cannot be undone</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-primary animate-spin" />
                </div>
              ) : error ? (
                <div className="p-4 text-center text-red-600 bg-red-50 rounded-lg">
                  {error}
                </div>
              ) : getFilteredTransactions().length > 0 ? (
                <div className="space-y-3">
                  {getFilteredTransactions().map((txn) => (
                    <div
                      key={txn.id}
                      className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-gray-200 hover:bg-white transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            txn.type === 'send' ? 'bg-red-50' : 'bg-green-50'
                          }`}
                        >
                          {txn.type === 'send' ? (
                            <ArrowUpRight className="w-4 h-4 text-red-600" />
                          ) : (
                            <ArrowDownLeft className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{txn.user_phone}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(txn.created_at).toLocaleDateString()}{' '}
                            {new Date(txn.created_at).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">
                          {txn.type === 'send' ? '-' : '+'}KES {txn.amount.toLocaleString()}
                        </p>
                        <span
                          className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded ${getStatusColor(
                            txn.status
                          )}`}
                        >
                          {getStatusIcon(txn.status)} {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Filter className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    No transactions for this period
                  </p>
                </div>
              )}

              {transactions.length > 0 && (
                <div className="flex gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearTransactions}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 flex-1 bg-transparent"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
