// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

contract CampaignFactory {
    address[] public deployedCampaigns;

    event CampaignCreated(
        string title,
        uint requiredAmount,
        address indexed owner,
        address campaignAddress,
        uint indexed timestamp,
        string indexed category
    );

    function createCampaign(
        string memory campaignTitle,
        uint requiredCampaignAmount,
        string memory category,
        string memory campaignDescription
    ) public {
        // Create new Campaign
        Campaign newCampaign = new Campaign(
            campaignTitle,
            requiredCampaignAmount,
            campaignDescription,
            msg.sender
        );

        // Add new campaign to the deployed campaigns array
        deployedCampaigns.push(address(newCampaign));

        // Emit event for campaign creation
        emit CampaignCreated(
            campaignTitle,
            requiredCampaignAmount,
            msg.sender,
            address(newCampaign),
            block.timestamp,
            category
        );
    }
}

contract Campaign {
    string public title;
    uint public requiredAmount;
    string public description;
    address payable public owner;
    uint public receivedAmount;

    event Donated(
        address indexed donor,
        uint indexed amount,
        uint indexed timestamp
    );

    constructor(
        string memory campaignTitle,
        uint requiredCampaignAmount,
        string memory campaignDescription,
        address campaignOwner
    ) {
        title = campaignTitle;
        requiredAmount = requiredCampaignAmount;
        description = campaignDescription;
        owner = payable(campaignOwner);
    }

    function donate() public payable {
        // Check if required amount is not yet fulfilled
        require(receivedAmount < requiredAmount, "Required amount fulfilled");

        // Transfer donation to the owner
        owner.transfer(msg.value);

        // Update received amount
        receivedAmount += msg.value;

        // Emit donation event
        emit Donated(msg.sender, msg.value, block.timestamp);
    }
}
