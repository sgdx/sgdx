pragma solidity ^0.5.0;

import "../node-modules/openzeppelin-solidity/contracts/access/Roles.sol";



contract BlackListerRole {
    using Roles for Roles.Role;

    event BlackListerAdded(address indexed account);
    event BlackListerRemoved(address indexed account);

    Roles.Role private _blacklisters;

    constructor () internal {
        _addBlackLister(msg.sender);
    }

    modifier onlyBlackLister() {
        require(isBlackLister(msg.sender), "BlackListerRole: caller does not have the BlackLister role");
        _;
    }

    function isBlackLister(address account) public view returns (bool) {
        return _blacklisters.has(account);
    }

    function addBlackLister(address account) public onlyBlackLister {
        _addBlackLister(account);
    }

    function renounceBlackLister() public {
        _removeBlackLister(msg.sender);
    }

    function _addBlackLister(address account) internal {
        _blacklisters.add(account);
        emit BlackListerAdded(account);
    }

    function _removeBlackLister(address account) internal {
        _blacklisters.remove(account);
        emit BlackListerRemoved(account);
    }
}
