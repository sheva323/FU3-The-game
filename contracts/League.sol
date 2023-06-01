// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts@4.9.0/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.9.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.9.0/utils/Counters.sol";

contract PlatziLeague is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _teamsCounter;
    address contractHolder;
    uint256 maxTeams;
    uint256 minTeams;
    uint256 prize;
    bool hasStarted;
    struct Team {
        uint256 id;
        string name;
        uint256 points;
    }
    struct Match {
        uint256 id;
        uint256 teamA;
        uint256 teamB;
        uint256 teamAScore;
        uint256 teamBScore;
        bool isPlayed;
        uint256 date;
    }
    //team id => Team
    mapping(uint256 => Team) private teams;
    //match id => Match
    mapping(uint256 => Match) private matches;
    mapping(uint256 => uint256) private matchesByDate;

    constructor() payable {
        contractHolder = payable(msg.sender);
        prize = msg.value;
    }

    function addTeam(string calldata _teamName) external onlyOwner {
        require(
            _teamsCounter.current() < maxTeams,
            "The max amount of teams is reached"
        );
        _teamsCounter.increment();
        Team memory newTeam = Team(_teamsCounter.current(), _teamName, 0);
        teams[_teamsCounter.current()] = newTeam;
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
        require(matches[_matchId].isPlayed == false, "The match has already been played");
        
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
}
