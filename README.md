# SkyWork Stable Coin - Alpha Version

## This is Truffle Framework Smart Contract Project implementing ERC-20 Stable Coin Smart Contract for SkyWork

### It implements following requirements:
- Follows ERC-20 token standard. 
- Implements Following Additional Functionality
  - Minting
  - Burning
  - Pausing/Unpausing
  - Adding/Removing Accounts to Black List
  - Destroying blacklisted funds
  - Only authorized accounts are able to execute following functions. This managed by adding users to following roles:
    - Minter - Can Mint New Tokens. Default is contract owner (creator)
    - BlackLister - Can Add/Remove accounts to the blacklist. Can also destroy blacklisted funds.
    - Pauser - Can pause and unpause token transfer functionality.


### In addition to ERC-20 token standard this smart contract emits following events:
- `event BlackListerAdded(address indexed account)` - Emitted when account was added Blaklister role. 
- `event BlackListerRemoved(address indexed account);` - Emitted when user had blacklister role revoked. 
- `event AddedToBlackList(address indexed account);` - Emitted when account was added to the blacklist.
- `event RemovedFromBlackList(address indexed account);` - Emitted when account was removed from the blacklist. 
- `event BlackFundsDestroyed(address indexed account, uint256 funds);` - Emitted when funds of blacklisted account have been destroyed. 



