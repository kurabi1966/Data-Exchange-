import web3 from './web3';
const contract_address = '0xcf95d3b0779656f245ff40f505ec981ccb4d36a6';
const contract_abi = [
  {
    constant: false,
    inputs: [
      {
        name: '_title',
        type: 'string'
      },
      {
        name: '_ipfsHash',
        type: 'string'
      },
      {
        name: '_price',
        type: 'uint256'
      }
    ],
    name: 'addProduct',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'buyProduct',
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ],
    payable: true,
    stateMutability: 'payable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'resumeProduct',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      {
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'suspenedProduct',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    constant: false,
    inputs: [
      {
        name: '_title',
        type: 'string'
      },
      {
        name: '_ipfsHash',
        type: 'string'
      },
      {
        name: '_price',
        type: 'uint256'
      }
    ],
    name: 'updateProduct',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: 'index',
        type: 'uint256'
      }
    ],
    name: 'getProduct',
    outputs: [
      {
        name: '',
        type: 'string'
      },
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [],
    name: 'getProductsLength',
    outputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  },
  {
    constant: true,
    inputs: [
      {
        name: '',
        type: 'uint256'
      }
    ],
    name: 'productsArray',
    outputs: [
      {
        name: '',
        type: 'string'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];
export default new web3.eth.Contract(contract_abi, contract_address);
