// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.9.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.9.0/security/Pausable.sol";
import "@openzeppelin/contracts@4.9.0/utils/Counters.sol";

contract PlatziLeague is Ownable, Pausable {
    using Counters for Counters.Counter;
    Counters.Counter private _teamsCounter;
    address private contractHolder;
    string private name;
    uint256 private maxTeams;
    uint256 private minTeams;
    uint256 private prize;
    bool private hasStarted;
    struct Team {
        uint256 id;
        string name;
        uint256 points;
        address[] players;
    }
    struct Match {
        uint256 id;
        uint256 teamA;
        uint256 teamB;
        uint256 teamAScore;
        uint256 teamBScore;
        uint256 date;
        bool isPlayed;
    }
    //team id => Team
    mapping(uint256 => Team) private teams;
    //match id => Match
    mapping(uint256 => Match) private matches;
    mapping(uint256 => uint256) private matchesByDate;
    event Payment(address indexed winner, uint256 indexed amount);

    constructor(
        uint256 _max,
        uint256 _min,
        uint256 _prize,
        string memory _name
    ) payable {
        contractHolder = payable(msg.sender);
        prize = msg.value;
        maxTeams = _max;
        minTeams = _min;
        prize = _prize;
        name = _name;
    }

    function addTeam(string calldata _teamName) external whenNotPaused {
        require(
            _teamsCounter.current() < maxTeams,
            "The max amount of teams is reached"
        );
        require(!isAddressInTeam(msg.sender) , "The player is already playing");
        _teamsCounter.increment();
        address[] memory players;
        Team memory newTeam = Team(
            _teamsCounter.current(),
            _teamName,
            0,
            players
        );
        teams[_teamsCounter.current()] = newTeam;
    }

    function addPlayer(uint256 _teamId) external {
        require(teams[_teamId].players.length < 5, "This team is full");
        require(!isAddressInTeam(msg.sender) , "The player is already playing");
        teams[_teamId].players.push(msg.sender);
    }

    function getTeams() external view returns (Team[] memory) {
        Team[] memory allTeams = new Team[](_teamsCounter.current());
        for (uint256 i = 1; i <= _teamsCounter.current(); i++) {
            allTeams[i - 1] = teams[i];
        }
        return allTeams;
    }

    function getPlayersByTeamId(uint256 teamId)
        public
        view
        returns (address[] memory)
    {
        require(teamId <= _teamsCounter.current(), "Invalid team ID");

        return teams[teamId].players;
    }

    function getLeagueInfo()
        external
        view
        returns (
            string memory,
            uint256,
            uint256,
            uint256
        )
    {
        return (name, maxTeams, minTeams, prize);
    }

    function getPrize() external view returns (uint256) {
        return prize;
    }

    function isAddressInTeam(address _addressToCheck)
        public
        view
        returns (bool)
    {
        for (uint256 i = 1; i <= _teamsCounter.current(); i++) {
            address[] memory players = teams[i].players;
            for (uint256 j = 0; j < players.length; j++) {
                if (players[j] == _addressToCheck) {
                    return true;
                }
            }
        }
        return false;
    }

    function startLeague() external onlyOwner {
        require(
            _teamsCounter.current() < minTeams,
            "There must be an minimum amount of teams"
        );
        hasStarted = true;
    }

    function registerMatchResult(
        uint256 _matchId,
        uint256 _teamAScore,
        uint256 _teamBScore,
        uint256 _date
    ) external onlyOwner {
        require(hasStarted, "The league has not started yet");
        require(
            matches[_matchId].isPlayed == false,
            "The match has already been played"
        );

        matches[_matchId].teamAScore = _teamAScore;
        matches[_matchId].teamBScore = _teamBScore;
        matches[_matchId].isPlayed = true;
        matches[_matchId].date = _date;
        matchesByDate[_date] = _matchId;
        // Update team points based on match result
        uint256 teamAId = matches[_matchId].teamA;
        uint256 teamBId = matches[_matchId].teamB;

        if (_teamAScore > _teamBScore) {
            teams[teamAId].points += 3; // Team A wins
        } else if (_teamAScore < _teamBScore) {
            teams[teamBId].points += 3; // Team B wins
        } else {
            teams[teamAId].points += 1; // Draw
            teams[teamBId].points += 1; // Draw
        }
    }

    function getMatchByDate(uint256 _date) public view returns (uint256) {
        require(_date > 0, "Invalid date");
        require(matchesByDate[_date] > 0, "No match found for the given date");

        return matchesByDate[_date];
    }

    function getTeamPoints(uint256 _teamId) public view returns (uint256) {
        require(_teamId <= _teamsCounter.current(), "Invalid team ID");
        return teams[_teamId].points;
    }

    function payPrize() external onlyOwner whenNotPaused {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function payWinningTeam() external onlyOwner {
        require(hasStarted, "The league has not started yet");

        uint256 highestPoints = 0;
        uint256 winningTeamId;

        for (uint256 i = 1; i <= _teamsCounter.current(); i++) {
            if (teams[i].points > highestPoints) {
                highestPoints = teams[i].points;
                winningTeamId = i;
            }
        }

        address[] memory players = teams[winningTeamId].players;
        uint256 prizePerPlayer = prize / players.length;

        for (uint256 i = 0; i < players.length; i++) {
            (bool sent, ) = players[i].call{value: prizePerPlayer}("");
            require(sent, "Failed to send balance to winner");
            emit Payment(players[i], prizePerPlayer);
        }
    }

    function returnFunds() external onlyOwner whenNotPaused {
        (bool sent, ) = contractHolder.call{value: address(this).balance}("");
        require(sent, "Failed to send balance to winner");
        emit Payment(contractHolder, address(this).balance);
    }
}
