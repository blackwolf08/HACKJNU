module.exports = {
  MATIC_PROVIDER: "https://testnetv3.matic.network", // This is the MATIC testnet RPC
  PARENT_PROVIDER:
    "https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc", // This is the Ropsten testnet RPC
  REGISTRY_ADDRESS: "0x56B082d0a590A7ce5d170402D6f7f88B58F71988",
  ROOTCHAIN_ADDRESS: "0x82a72315E16cE224f28E1F1fB97856d3bF83f010", // The address for the main Plasma contract in  Ropsten testnet
  WITHDRAWMANAGER_ADDRESS: "0x3cf9aD3395028a42EAfc949e2EC4588396b8A7D4", // An address for the WithdrawManager contract on Ropsten testnet
  DEPOSITMANAGER_ADDRESS: "0x3Bc6701cA1C32BBaC8D1ffA2294EE3444Ad93989", // An address for a DepositManager contract in Ropsten testnet
  SYNCER_URL: "https://testnetv3-syncer.api.matic.network/api/v1", // Backend service which syncs the Matic sidechain state to a MySQL database which we use for faster querying. This comes in handy especially for constructing withdrawal proofs while exiting assets from Plasma.
  WATCHER_URL: "https://testnetv3-watcher.api.matic.network/api/v1", // Backend service which syncs the Matic Plasma contract events on Ethereum mainchain to a MySQL database which we use for faster querying. This comes in handy especially for listening to asset deposits on the Plasma contract.
  ROOTWETH_ADDRESS: "0x7BdDd37621186f1382FD59e1cCAE0316F979a866", // This is a wrapped ETH ERC20 contract address so that we can support ETH deposits to the sidechain
  MATICWETH_ADDRESS: "0x8567184E6F9b1B77f24AfF6168453419AD22f90e", // The corresponding wrapped ETH ERC20 contract address on the Matic chain
  PRIVATE_KEY:
    "0xBC583203057DE3382060D2BE00581D7890AD1B202CEB7103CA8AAD6B8005CF11", // A sample private key prefix with `0x`
  FROM_ADDRESS: "0xa2FF9b0B9c74D3FDEFA77b159E42d1760488da74", // Your address
  ROPSTEN_TEST_TOKEN: "0x70459e550254b9d3520a56ee95b78ee4f2dbd846", // Contract for ERC20 in Ropsten
  MATIC_TEST_TOKEN: "0x9a93c912F4eFf0254d178a18ACD980C1B05b57b0", // Contract for ERC20 in Matic testnet
  ROPSTEN_ERC721_TOKEN: "0x07d799252cf13c01f602779b4dce24f4e5b08bbd", // Contract for ERC721 in Ropsten testnet
  MATIC_ERC721_TOKEN: "0x8D5231e0B79edD9331e0CF0d4B9f3F30d05C47A5" // Contract for ERC721 in matic testnet
};
