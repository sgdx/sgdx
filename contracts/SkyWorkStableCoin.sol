pragma solidity 0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";
import "./BlackListerRole.sol";


/**
 * @title SkyWork Stable Coin
 *
 * @notice Smart Contract provides ERC20 functionality with
 *         an option to pause, unpause, mint, burn tokens.
 *         It also allows to blacklist user and burn their tokens.
 * @author Robert Magier
 */

contract SkyWorkStableCoin is ERC20Burnable, ERC20Mintable,ERC20Detailed, ERC20Pausable, BlackListerRole {


    event AddedToBlackList(address indexed account);
    event RemovedFromBlackList(address indexed account);
    event BlackFundsDestroyed(address indexed account, uint256 funds);


    mapping(address=>bool) private _blacklist;

    /**
    * @notice SkyWork Stabel Coin constructor.
    * @dev Constructor calls ERC20Detailed constructor to set name, symbol and decimals.
    * @param name ERC20 token name
    * @param symbol ERC20 Symbol
    * @param decimals number of decimals
     */

    constructor(string memory name, string memory symbol,uint8 decimals) public
    ERC20Detailed(name, symbol, decimals)
    {
        return;
    }

    /**
    * @notice Adds user account to the blacklist.
    * @param account User address to add to blacklist
    * @dev Can be only called by account having BlackLister Role
     */
    function addToBlackList(address account) public onlyBlackLister {
        require(_blacklist[account] == false, "Account is already blacklisted");
        _blacklist[account] = true;
        emit AddedToBlackList(account);
    }

    /**
    @notice Remove user from blacklist.
    @dev You can remove only this user which was before to the blacklist. In other case it will throw an error.
    @param account address of an account to remove from the blacklist.
     */
    function removeFromBlackList(address account) public onlyBlackLister {
        require(_blacklist[account] == true, "Account is not blacklisted");
        _blacklist[account] = false;
        emit RemovedFromBlackList(account);
    }

    /**
    * @notice Returns true if user is blacklisted.
    * @param account address of an account to check if was added to the blacklist.
    * @return true if user was addded to the blacklist and false if wasn't.
     */
    function isBlackListed(address account) public view returns(bool) {
        return _blacklist[account];
    }

        /**
     * @dev Modifier to make a function callable only when the sender and receiver is not on the blacklist.
     */
    modifier notBlackListed(address _receiver) {
        require(_blacklist[msg.sender] == false, "Transaction Sender is Black Listed");
        require(_blacklist[_receiver] == false, "Transaction Reciver is Black Listed");
        _;
    }

        modifier notBlackListedToMany (address[] memory _receiver) {
        uint256 length = _receiver.length;
        require(_blacklist[msg.sender] == false, "Transaction Sender is Black Listed");

        for(uint256 i = 0;i < length;i++)
        {
        require(_blacklist[_receiver[i]] == false, "Transaction Reciver is Black Listed");
        }
        _;
    }

    function destroyBlackFunds(address account) public onlyBlackLister {
        require(_blacklist[account] == true, "Account is not blacklisted");
        uint256 balance = balanceOf(account);

        _burn(account, balance);
        emit BlackFundsDestroyed(account, balance);
    }

    // function transferToMany (address[] memory to, uint256[] memory value) public notBlackListedToMany(to) returns (bool) {
    //     require(to.length == value.length,'To array and Value array length do not match');

    //     for(uint i = 0; i < to.length; i++) {
    //         transfer(to[i],value[i]);
    //     }
    // }

    // function mintToMany (address[] memory to, uint256[] memory value) public notBlackListedToMany(to) returns (bool) {
    //     require(to.length == value.length,'To array and Value array length do not match');

    //         for(uint i = 0; i < to.length; i++) {
    //         mint(to[i],value[i]);
    //     }
    // }

    // function balanceOfMany (address[] memory account) public view returns (uint256[] memory) {
    //     uint256[] memory balances = new uint256[](account.length);

    //         for(uint i = 0; i < account.length; i++) {
    //         balances[i] = balanceOf(account[i]);
    //     }
    //     return balances;
    // }


    function transfer(address to, uint256 value) public notBlackListed(to) returns (bool) {
        super.transfer(to,value);
    }

    function transferFrom(address from, address to, uint256 value) public notBlackListed(to) returns (bool) {
        return super.transferFrom(from, to, value);
    }

    function approve(address spender, uint256 value) public notBlackListed(spender) returns (bool) {
        return super.approve(spender, value);
    }

    function increaseAllowance(address spender, uint addedValue) public notBlackListed(spender) returns (bool) {
        return super.increaseAllowance(spender, addedValue);
    }

    function decreaseAllowance(address spender, uint subtractedValue) public notBlackListed(spender) returns (bool) {
        return super.decreaseAllowance(spender, subtractedValue);
    }



}