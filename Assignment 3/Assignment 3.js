/**
 * Assignment: Refactoring Callback-based Code to Promises and Async/Await
 * 
 * This assignment demonstrates the refactoring of callback-based asynchronous code
 * to use modern Promise and async/await patterns for improved readability and 
 * error handling.
 */

// ===================================================================
// PART 1: ORIGINAL CALLBACK-BASED IMPLEMENTATION
// ===================================================================

/**
 * Original callback-based functions - these simulate database operations
 * with artificial delays to demonstrate asynchronous behavior
 */

function getUserById(userId, callback) {
    setTimeout(() => {
        if (userId <= 0) {
            return callback(new Error('Invalid user ID'));
        }
        const user = {
            id: userId,
            name: `Saumil Bansal ${userId}`,
            email: `bansalsaumil1${userId}@gmail.com`
        };
        callback(null, user);
    }, 1000);
}

function getUserOrders(userId, callback) {
    setTimeout(() => {
        if (userId <= 0) {
            return callback(new Error('Invalid user ID for orders'));
        }
        const orders = [
            { orderId: 101, product: 'Laptop', amount: 999.99 },
            { orderId: 102, product: 'Mouse', amount: 25.50 }
        ];
        callback(null, orders);
    }, 800);
}

function getOrderDetails(orderId, callback) {
    setTimeout(() => {
        if (orderId <= 0) {
            return callback(new Error('Invalid order ID'));
        }
        const orderDetails = {
            orderId: orderId,
            status: 'Shipped',
            trackingNumber: 'TRK123456789',
            estimatedDelivery: '2024-12-15'
        };
        callback(null, orderDetails);
    }, 600);
}

/**
 * Problem: Callback Hell - Nested callbacks make code difficult to read and maintain
 */
function getCompleteUserDataCallback(userId, finalCallback) {
    // First level - get user data
    getUserById(userId, (err, user) => {
        if (err) {
            return finalCallback(err);
        }
        
        // Second level - get user orders
        getUserOrders(userId, (err, orders) => {
            if (err) {
                return finalCallback(err);
            }
            
            // Third level - get details for first order
            if (orders.length > 0) {
                getOrderDetails(orders[0].orderId, (err, orderDetails) => {
                    if (err) {
                        return finalCallback(err);
                    }
                    
                    // Success - return combined data
                    finalCallback(null, {
                        user: user,
                        orders: orders,
                        firstOrderDetails: orderDetails
                    });
                });
            } else {
                finalCallback(null, {
                    user: user,
                    orders: orders,
                    firstOrderDetails: null
                });
            }
        });
    });
}

// ===================================================================
// PART 2: REFACTORED PROMISE-BASED IMPLEMENTATION
// ===================================================================

/**
 * Step 1: Converting callback functions to return Promises
 * This eliminates the need for callback parameters and allows chaining
 */

function getUserByIdPromise(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId <= 0) {
                reject(new Error('Invalid user ID'));
            } else {
                const user = {
                    id: userId,
                    name: `Saumil Bansal ${userId}`,
                    email: `bansalsaumil1${userId}@gmail.com`
                };
                resolve(user);
            }
        }, 1000);
    });
}

function getUserOrdersPromise(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId <= 0) {
                reject(new Error('Invalid user ID for orders'));
            } else {
                const orders = [
                    { orderId: 101, product: 'Laptop', amount: 999.99 },
                    { orderId: 102, product: 'Mouse', amount: 25.50 }
                ];
                resolve(orders);
            }
        }, 800);
    });
}

function getOrderDetailsPromise(orderId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (orderId <= 0) {
                reject(new Error('Invalid order ID'));
            } else {
                const orderDetails = {
                    orderId: orderId,
                    status: 'Shipped',
                    trackingNumber: 'TRK123456789',
                    estimatedDelivery: '2024-12-15'
                };
                resolve(orderDetails);
            }
        }, 600);
    });
}

/**
 * Step 2: Using Promise chains (.then() method)
 * This improves readability compared to nested callbacks
 */
function getCompleteUserDataPromise(userId) {
    let userData = {};
    
    return getUserByIdPromise(userId)
        .then(user => {
            userData.user = user;
            return getUserOrdersPromise(userId);
        })
        .then(orders => {
            userData.orders = orders;
            if (orders.length > 0) {
                return getOrderDetailsPromise(orders[0].orderId);
            } else {
                return null;
            }
        })
        .then(orderDetails => {
            userData.firstOrderDetails = orderDetails;
            return userData;
        })
        .catch(error => {
            throw new Error(`Data retrieval failed: ${error.message}`);
        });
}

// ===================================================================
// PART 3: ASYNC/AWAIT IMPLEMENTATION (BEST PRACTICE)
// ===================================================================

/**
 * Step 3: Using async/await for the cleanest, most readable code
 * This makes asynchronous code look and behave like synchronous code
 */
async function getCompleteUserDataAsync(userId) {
    try {
        // Sequential execution - each operation waits for the previous one
        const user = await getUserByIdPromise(userId);
        const orders = await getUserOrdersPromise(userId);
        
        let firstOrderDetails = null;
        if (orders.length > 0) {
            firstOrderDetails = await getOrderDetailsPromise(orders[0].orderId);
        }
        
        return {
            user,
            orders,
            firstOrderDetails
        };
    } catch (error) {
        throw new Error(`Data retrieval failed: ${error.message}`);
    }
}

/**
 * Step 4: Optimized version with parallel execution
 * User data and orders can be fetched simultaneously for better performance
 */
async function getCompleteUserDataOptimized(userId) {
    try {
        // Parallel execution - both operations start simultaneously
        const [user, orders] = await Promise.all([
            getUserByIdPromise(userId),
            getUserOrdersPromise(userId)
        ]);
        
        // Sequential execution for order details (depends on orders result)
        let firstOrderDetails = null;
        if (orders.length > 0) {
            firstOrderDetails = await getOrderDetailsPromise(orders[0].orderId);
        }
        
        return {
            user,
            orders,
            firstOrderDetails
        };
    } catch (error) {
        throw new Error(`Data retrieval failed: ${error.message}`);
    }
}

// ===================================================================
// PART 4: UTILITY FUNCTIONS AND ADVANCED PATTERNS
// ===================================================================

/**
 * Utility function to convert any callback-based function to Promise-based
 * This is useful when working with legacy callback APIs
 */
function promisify(callbackFunction) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            callbackFunction(...args, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };
}

// Example usage of promisify utility
const getUserByIdP = promisify(getUserById);
const getUserOrdersP = promisify(getUserOrders);
const getOrderDetailsP = promisify(getOrderDetails);

/**
 * Advanced error handling pattern
 * Continues execution even if some operations fail
 */
async function getCompleteUserDataRobust(userId) {
    const result = {
        success: true,
        errors: [],
        data: {}
    };
    
    try {
        result.data.user = await getUserByIdPromise(userId);
    } catch (error) {
        result.success = false;
        result.errors.push(`User fetch failed: ${error.message}`);
    }
    
    try {
        result.data.orders = await getUserOrdersPromise(userId);
    } catch (error) {
        result.success = false;
        result.errors.push(`Orders fetch failed: ${error.message}`);
        result.data.orders = [];
    }
    
    if (result.data.orders && result.data.orders.length > 0) {
        try {
            result.data.firstOrderDetails = await getOrderDetailsPromise(result.data.orders[0].orderId);
        } catch (error) {
            result.success = false;
            result.errors.push(`Order details fetch failed: ${error.message}`);
        }
    }
    
    return result;
}

// ===================================================================
// PART 5: DEMONSTRATION AND TESTING
// ===================================================================

/**
 * Function to demonstrate all approaches and compare their execution
 */
async function demonstrateRefactoring() {
    const userId = 1;
    
    console.log('=== CALLBACK APPROACH ===');
    getCompleteUserDataCallback(userId, (err, result) => {
        if (err) {
            console.error('Callback Error:', err.message);
        } else {
            console.log('Callback Success:', JSON.stringify(result, null, 2));
        }
    });
    
    console.log('\n=== PROMISE APPROACH ===');
    try {
        const promiseResult = await getCompleteUserDataPromise(userId);
        console.log('Promise Success:', JSON.stringify(promiseResult, null, 2));
    } catch (error) {
        console.error('Promise Error:', error.message);
    }
    
    console.log('\n=== ASYNC/AWAIT APPROACH ===');
    try {
        const asyncResult = await getCompleteUserDataAsync(userId);
        console.log('Async/Await Success:', JSON.stringify(asyncResult, null, 2));
    } catch (error) {
        console.error('Async/Await Error:', error.message);
    }
    
    console.log('\n=== OPTIMIZED PARALLEL APPROACH ===');
    try {
        const startTime = Date.now();
        const optimizedResult = await getCompleteUserDataOptimized(userId);
        const endTime = Date.now();
        console.log('Optimized Success:', JSON.stringify(optimizedResult, null, 2));
        console.log(`Execution time: ${endTime - startTime}ms`);
    } catch (error) {
        console.error('Optimized Error:', error.message);
    }
    
    console.log('\n=== ROBUST ERROR HANDLING ===');
    const robustResult = await getCompleteUserDataRobust(userId);
    console.log('Robust Result:', JSON.stringify(robustResult, null, 2));
}

// ===================================================================
// PART 6: CONCLUSION AND ANALYSIS
// ===================================================================

/**
 * ANALYSIS OF REFACTORING BENEFITS:
 * 
 * 1. READABILITY:
 *    - Callbacks: Deeply nested, hard to follow execution flow
 *    - Promises: Linear chain, easier to read than callbacks
 *    - Async/Await: Reads like synchronous code, most intuitive
 * 
 * 2. ERROR HANDLING:
 *    - Callbacks: Error checking at every level, repetitive
 *    - Promises: Single .catch() handles all errors in chain
 *    - Async/Await: Single try/catch block, cleanest approach
 * 
 * 3. PERFORMANCE:
 *    - Callbacks: Sequential execution only
 *    - Promises: Can use Promise.all() for parallel execution
 *    - Async/Await: Supports both sequential and parallel patterns
 * 
 * 4. MAINTAINABILITY:
 *    - Callbacks: Difficult to modify, debug, and test
 *    - Promises: Better structure, easier to modify
 *    - Async/Await: Easiest to maintain and extend
 * 
 * 5. DEBUGGING:
 *    - Callbacks: Stack traces can be confusing
 *    - Promises: Better stack traces than callbacks
 *    - Async/Await: Most natural debugging experience
 */

// Execute demonstration
demonstrateRefactoring().catch(console.error);