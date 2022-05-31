- Last 10 succsessful trasnfers and total successful transfers count in network:
```
{
  transfers(limit: 10, orderBy: blockNumber_DESC) {
    fromId
    toId
    amount
    timestamp
    success
  }
  
  transfersConnection(orderBy: id_ASC, where: {success_eq: true}) {
    totalCount
  }
}
```
- Account's transfers:
```
{
  accountById(id: "ADDRESSID") {
    transfers {
      direction
      transfer {
        fromId
        toId
        amount
        timestamp
        success
      }
    }
  }
}
```
- Accounts's staking information:
```
{
  accountById(id: "ADDRESSID") {
    totalReward
    totalSlash
    rewards {
      amount
      era
      validator
      timestamp
    }
    slashes {
      amount
      era
      timestamp
    }
  }
}
```
- Accounts's rewards and slashes:
```
{
  accountById(id: "ADDRESSID") {
    activeBond
    totalReward
    totalSlash
    stakingInfo {
      stashId
      controllerId
      payeeId
      role
    }
  }
}
```
- Accounts's bond history
```
{
  accountById(id: "ADDRESSID") {
    bonds {
      timestamp
      total
      amount
      type
    }
  }
}
```
- Accounts's crowdloans participation:
```
{
  accountById(id: "ADDRESSID") {
    crowdloans {
      crowdloan {
        parachainId
        raised
      }
      amount
    }
  }
}
```
- Last era information:
```
{
  eras(limit: 1, orderBy: index_DESC) {
    startedAt
    timestamp
    validatorsCount
    nominatorsCount
    total
    validators {
      stashId
      selfBonded
      totalBonded
      nominators {
        nominator {
          stashId
        }
        vote
      }
    }
  }
}
```
- Crowdloans information:
```
{
  crowdloans {
    parachain {
      paraId
      name
    }
    createdAt
    end
    firstPeriod
    lastPeriod
    raised
    contributors {
      accountId
      amount
    }
  }
}
```