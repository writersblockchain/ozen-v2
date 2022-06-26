//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.13;

import "hardhat/console.sol";

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import { ISuperfluid, ISuperToken, ISuperApp } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import { ISuperfluidToken } from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluidToken.sol";

import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

contract UserApp {
    address public owner;

    using CFAv1Library for CFAv1Library.InitData;
    CFAv1Library.InitData public cfaV1; //initialize cfaV1 variable
    
    mapping (address => bool) public accountList;

    constructor(ISuperfluid host, address _owner) {

        assert(address(host) != address(0));
        console.log("Deploying a Money Router with owner:", msg.sender);
        owner = _owner;

        //initialize InitData struct, and set equal to cfaV1        
        cfaV1 = CFAv1Library.InitData(
        host,
        //here, we are deriving the address of the CFA using the host contract
        IConstantFlowAgreementV1(
            address(host.getAgreementClass(
                    keccak256("org.superfluid-finance.agreements.ConstantFlowAgreement.v1")
                ))
            )
        );
    }

    function whitelistAccount(address _account) external {
        require(msg.sender == owner, "only owner can whitelist accounts");
        accountList[_account] = true;
    }

    function removeAccount(address _account) external {
        require(msg.sender == owner, "only owner can remove accounts");
        accountList[_account] = false;
    }

    function changeOwner(address _newOwner) external {
        require(msg.sender == owner, "only owner can change ownership");
        owner = _newOwner;
    }

    function sendLumpSumToContract(ISuperToken token, uint amount) external {
        require(msg.sender == owner || accountList[msg.sender] == true, "must be authorized");
        token.transferFrom(msg.sender, address(this), amount);
    }

    function createFlowFromArtist(ISuperfluidToken token, address _artistAddress, int96 flowRate) external {
        require(msg.sender == owner || accountList[msg.sender] == true, "must be authorized");

        cfaV1.createFlowByOperator(_artistAddress,address(this), token, flowRate);
    }

    function updateFlowFromArtist(ISuperfluidToken token, int96 newFlowRate,address _artistAddress) external {
        require(msg.sender == owner || accountList[_artistAddress] == true, "must be authorized");

        cfaV1.updateFlowByOperator(_artistAddress, address(this), token, newFlowRate);
    }

    function deleteFlowFromArtist(ISuperfluidToken token, address _artistAddress) external {
        require(msg.sender == owner || accountList[msg.sender] == true, "must be authorized");

        cfaV1.deleteFlow(_artistAddress,address(this), token);
    }


    function createFlowToArtist(ISuperfluidToken token, address artistAddress, int96 flowRate) external {
        require(msg.sender == owner || accountList[msg.sender] == true, "must be authorized");
        cfaV1.createFlow(artistAddress, token, flowRate);
    }

    function updateFlowToArtist(ISuperfluidToken token, address artistAddress, int96 newFlowRate) external {
        require(msg.sender == owner || accountList[msg.sender] == true, "must be authorized");
        cfaV1.updateFlow(artistAddress, token, newFlowRate);
    }

    function deleteFlowToArtist(ISuperfluidToken token, address artistAddress) external {
        require(msg.sender == owner || accountList[msg.sender] == true, "must be authorized");
        cfaV1.deleteFlow(address(this), artistAddress, token);
    }

    function approveFlow(address to, ISuperfluidToken token, int96 allowance) public {
        require(msg.sender == owner || accountList[msg.sender] == true, "must be authorized");

        cfaV1.updateFlowOperatorPermissions(to, token,7,allowance);

    }
}
