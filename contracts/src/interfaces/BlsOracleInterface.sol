// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface BlsOracleInterface {
  function decimals() external view returns (uint8);

  function latestAnswer() external view returns (int256);

  function latestTimestamp() external view returns (uint256);

  function latestRound() external view returns (uint256);

  function latestRoundData() external view returns (
    uint80 roundId,
    int256 answer,
    uint256 startedAt,
    uint256 updatedAt,
    uint80 answeredInRound
  );

  event AnswerUpdated(
      int256 indexed current,
      uint256 indexed roundId,
      uint256 updatedAt
  );
}
