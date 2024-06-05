
export const limits: { [key: number]: any } = {
    4: [{ chainId: 4, isEnabled: true, minAmount: '1000000000000000', maxAmount: '100000000000000000' }, { chainId: 5, isEnabled: true, minAmount: '1000000000000000', maxAmount: '10000000000000000' }, { chainId: 80001, isEnabled: true, minAmount: '1000000000000000', maxAmount: '8000000000000000' }],
    5: [{ chainId: 5, isEnabled: true, minAmount: '1000000000000000', maxAmount: '100000000000000000' }, { chainId: 4, isEnabled: true, minAmount: '1000000000000000', maxAmount: '10000000000000000' }, { chainId: 80001, isEnabled: true, minAmount: '1000000000000000', maxAmount: '8000000000000000' }],
    80001: [{ chainId: 80001, isEnabled: true, minAmount: '1000000000000000000', maxAmount: '10000000000000000000' }, { chainId: 4, isEnabled: true, minAmount: '15000000000000000000', maxAmount: '30000000000000000000' }, { chainId: 5, isEnabled: true, minAmount: '15000000000000000000', maxAmount: '30000000000000000000' }],
    137: [{
        chainId: 43114,
        isEnabled: true,
        minAmount: '1000000000000000000',
        maxAmount: '10000000000000000000'
    }, {
        chainId: 56,
        isEnabled: true,
        minAmount: '500000000000000000',
        maxAmount: '5000000000000000000'
    }, {
        chainId: 137,
        isEnabled: true,
        minAmount: '0',
        maxAmount: '1000000000000000000'
    }, {
        chainId: 250,
        isEnabled: true,
        minAmount: '2500000000000000000',
        maxAmount: '25000000000000000000'
    }, {
        chainId: 42161,
        isEnabled: true,
        minAmount: '2500000000000000000',
        maxAmount: '25000000000000000000'
    }, {
        chainId: 100,
        isEnabled: true,
        minAmount: '100000000000000000',
        maxAmount: '1000000000000000000'
        // }, {
        //     chainId: 10,
        //     isEnabled: true,
        //     minAmount: '2500000000000000000',
        //     maxAmount: '20000000000000000000'
    }],
    250: [{
        chainId: 137,
        isEnabled: true,
        minAmount: '60000000000000000',
        maxAmount: '600000000000000000'
    }, {
        chainId: 56,
        isEnabled: true,
        minAmount: '60000000000000000',
        maxAmount: '600000000000000000'
    }, {
        chainId: 42161,
        isEnabled: true,
        minAmount: '3000000000000000000',
        maxAmount: '30000000000000000000'
    }, {
        chainId: 250,
        isEnabled: true,
        minAmount: '0',
        maxAmount: '10000000000000000000'
    }, {
        chainId: 43114,
        isEnabled: true,
        minAmount: '600000000000000000',
        maxAmount: '6000000000000000000'
    }, {
        chainId: 100,
        isEnabled: true,
        minAmount: '150000000000000000',
        maxAmount: '1500000000000000000'
    }],
    56: [{
        chainId: 43114,
        isEnabled: true,
        minAmount: '2000000000000000',
        maxAmount: '20000000000000000'
    }, {
        chainId: 56,
        isEnabled: true,
        minAmount: '0',
        maxAmount: '40000000000000000'
    }, {
        chainId: 137,
        isEnabled: true,
        minAmount: '200000000000000',
        maxAmount: '2000000000000000'
    }, {
        chainId: 250,
        isEnabled: true,
        minAmount: '2000000000000000',
        maxAmount: '10000000000000000'
    }, {
        chainId: 42161,
        isEnabled: true,
        minAmount: '1000000000000000',
        maxAmount: '10000000000000000'
        // }, {
        //     chainId: 10,
        //     isEnabled: true,
        //     minAmount: '3000000000000000000',
        //     maxAmount: '30000000000000000000'
    }, {
        chainId: 100,
        isEnabled: true,
        minAmount: '2000000000000000',
        maxAmount: '20000000000000000'
        // }, {
        //     chainId: 10,
        //     isEnabled: true,
        //     minAmount: '10000000000000000',
        //     maxAmount: '100000000000000000'
    }],
    43114: [{
        chainId: 137,
        isEnabled: true,
        minAmount: '1000000000000000',
        maxAmount: '10000000000000000'
    }, {
        chainId: 250,
        isEnabled: true,
        minAmount: '5000000000000000',
        maxAmount: '50000000000000000'
    }, {
        chainId: 56,
        isEnabled: true,
        minAmount: '10000000000000000',
        maxAmount: '100000000000000000'
    }, {
        chainId: 100,
        isEnabled: true,
        minAmount: '2000000000000000',
        maxAmount: '20000000000000000'
    }, {
        chainId: 42161,
        isEnabled: true,
        minAmount: '50000000000000000',
        maxAmount: '500000000000000000'
    }, {
        chainId: 10,
        isEnabled: false,
        minAmount: '50000000000000000',
        maxAmount: '500000000000000000'
    }, {
        chainId: 43114,
        isEnabled: true,
        minAmount: '0',
        maxAmount: '500000000000000000'
    }],
    42161: [{
        chainId: 137,
        isEnabled: true,
        minAmount: '25000000000000',
        maxAmount: '250000000000000'
    }, {
        chainId: 250,
        isEnabled: true,
        minAmount: '150000000000000',
        maxAmount: '1500000000000000'
    }, {
        chainId: 56,
        isEnabled: true,
        minAmount: '250000000000000',
        maxAmount: '2500000000000000'
    }, {
        chainId: 42161,
        isEnabled: true,
        minAmount: '0',
        maxAmount: '012500000000000000'
    }, {
        chainId: 100,
        isEnabled: true,
        minAmount: '50000000000000',
        maxAmount: '500000000000000'
    }, {
        chainId: 43114,
        isEnabled: true,
        minAmount: '250000000000000',
        maxAmount: '2500000000000000'
        // }, {
        //     chainId: 10,
        //     isEnabled: true,
        //     minAmount: '1250000000000000',
        //     maxAmount: '12500000000000000'
    }],
    10: [{ chainId: 137, isEnabled: true, minAmount: '25000000000000', maxAmount: '250000000000000' }, { chainId: 250, isEnabled: true, minAmount: '150000000000000', maxAmount: '1500000000000000' }, { chainId: 56, isEnabled: true, minAmount: '250000000000000', maxAmount: '2500000000000000' }, { chainId: 100, isEnabled: true, minAmount: '50000000000000', maxAmount: '500000000000000' }, { chainId: 43114, isEnabled: true, minAmount: '250000000000000', maxAmount: '2500000000000000' }, { chainId: 42161, isEnabled: true, minAmount: '1250000000000000', maxAmount: '12500000000000000' }],
    100: [{
        chainId: 137,
        isEnabled: true,
        minAmount: '100000000000000000',
        maxAmount: '1000000000000000000'
    }, {
        chainId: 250,
        isEnabled: true,
        minAmount: '600000000000000000',
        maxAmount: '6000000000000000000'
    }, {
        chainId: 56,
        isEnabled: true,
        minAmount: '1000000000000000000',
        maxAmount: '10000000000000000000'
    }, {
        chainId: 43114,
        isEnabled: true,
        minAmount: '1000000000000000000',
        maxAmount: '10000000000000000000'
    }, {
        chainId: 42161,
        isEnabled: true,
        minAmount: '5000000000000000000',
        maxAmount: '50000000000000000000'
    }, {
        chainId: 10,
        isEnabled: true,
        minAmount: '5000000000000000000',
        maxAmount: '50000000000000000000'
    }, {
        chainId: 100,
        isEnabled: true,
        minAmount: '0',
        maxAmount: '5000000000000000000'
    }],
    31337: [{ chainId: 31337, isEnabled: true, minAmount: '50000000000000000', maxAmount: '10000000000000000000' }],
}
