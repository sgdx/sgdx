# SkyWork Stable Coin - Alpha Version

    This is Truffle Framework Smart Contract Project implementing ERC-20 Stable Coin Smart Contract for SkyWork

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

### How to use it.
Execute following steps to work with smart contract on Etherscan 
- Go to Etherscan and find a contract. Paste contract address to Search Box and press enter. 
- Click on "View Dapp Page" icon. It is on the second table in the first row. Looks like pencil ( a bit ;)) 
- Once there you can use two sections. Read Contract which allows to call no state changing functions. Write Contract which allow to call state changing functions. 


*You need to have Metamask installed to be able to call Smart Contract functions. Metamask must be connected to correct network. If you are using ropsten.etherscan.io then you should
connect your Metamask to Ropsten network.*

### The most important functions
**Read Contract Section
- totalSupply - returns value of total Supply
- balanceOf - returns number of tokens owned by an account

**Write Contract section
- mint - allows to mint new tokens. Specify account receiving tokens and number of tokens to mint. 
- burn - burn specified number of your tokens. 
- addToBlackList - add account to the blacklist
- removeFromBlackList - remove account from blacklist. 
- addMinter - adds new Minter to smart contract. User has to be a Minter to add new Minter. 
- renounceMinter - removes Minter role from specified account. User has to be a Minter to renounce another account Minter role. 
- transfer - transfer specified number of your tokens to another account. 
- destroyBlackFunds - allows to destroy funds of blacklisted account. It set account balance to zero and decrease totalSupply. 
- pause - Pause Smart Contract. Transfering tokens will not be allowed. Can be called only by an account having Pauser role. 
- unpause - Unpuase Smart Contract. Tranfsering tokens will be again possible. 


### In addition to ERC-20 token standard this smart contract emits following events:
- `event BlackListerAdded(address indexed account)` - Emitted when account was added Blaklister role. 
- `event BlackListerRemoved(address indexed account);` - Emitted when user had blacklister role revoked. 
- `event AddedToBlackList(address indexed account);` - Emitted when account was added to the blacklist.
- `event RemovedFromBlackList(address indexed account);` - Emitted when account was removed from the blacklist. 
- `event BlackFundsDestroyed(address indexed account, uint256 funds);` - Emitted when funds of blacklisted account have been destroyed. 



