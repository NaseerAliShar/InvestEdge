// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.24;

contract CampaignFactory {
    address[] public deployedCampaigns;

    event campaignCreated(
        string title,
        string image,
        uint256 fundingGoal,
        address campaignAddress,
        address indexed creator,
        uint256 indexed timestamp,
        string indexed category
    );

    function createCampaign(
        string memory campaignTitle,
        string memory campaignImage,
        string memory campaignDescription,
        uint256 campaignFundingGoal,
        string memory category
    ) public {
        Campaign newCampaign = new Campaign(
            campaignTitle,
            campaignImage,
            campaignDescription,
            campaignFundingGoal
        );
        deployedCampaigns.push(address(newCampaign));

        emit campaignCreated(
            campaignTitle,
            campaignImage,
            campaignFundingGoal,
            address(newCampaign),
            msg.sender,
            block.timestamp,
            category
        );
    }
}

contract Campaign {
    string public title;
    string public image;
    string public description;
    uint256 public fundingGoal;
    uint256 public currentFunding;
    address payable public creator;
    uint256 public deadline;

    event contributed(
        address indexed donor,
        uint256 indexed amount,
        uint256 indexed timestamp
    );

    constructor(
        string memory campaignTitle,
        string memory campaignImage,
        string memory campaignDescription,
        uint256 campaignFundingGoal
    ) {
        creator = payable(msg.sender);
        title = campaignTitle;
        image = campaignImage;
        description = campaignDescription;
        fundingGoal = campaignFundingGoal; // * 10**18 // 1 ETH = 1e18 wei
    }

    function contribute() public payable {
        require(fundingGoal > currentFunding, "Funding goal has been met");
        require(msg.value > 0, "Contribution must be greater than 0");

        currentFunding += msg.value;
        creator.transfer(msg.value);

        emit contributed(msg.sender, msg.value, block.timestamp);
    }
}
