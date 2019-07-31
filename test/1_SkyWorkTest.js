var SkyWorkStableCoin = artifacts.require('SkyWorkStableCoin')

var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
expect = chai.expect
var SWSCContract

contract('SkyWorkStableCoin Baisc Test Set', async accounts => {

  it('01. Catch an instance of SkyWorkStableCoin contract.', async () => {

    SWSCContract  = await SkyWorkStableCoin.deployed()

    console.log(' ')
    console.log('    ***********************************************************')
    console.log('    SkyWorkStableCoin Contract:    '.blue, SWSCContract.address)
    console.log('    ***********************************************************')
    console.log(' ')

  })

  it('02. Check Total Supply', async () => {
    let totalSupply = await SWSCContract.totalSupply()
    console.log(`       Total Supply is: ${totalSupply.toNumber()}`);
    expect(totalSupply.toNumber()).to.be.equal(0)
  })

  it('03. Mint 100 New Tokens and account[1]. Should fail.', async () => {
    await expect(SWSCContract.mint(accounts[1], 100, {from:accounts[1]})).to.be.eventually.rejected
    let totalSupply = await SWSCContract.totalSupply()
    console.log(`       Total Supply is: ${totalSupply.toNumber()}`);
    expect(totalSupply.toNumber()).to.be.equal(0)
  })

  it('04. Add accounts[1] as a minter. Should be accepted because accounts[0] is a minter. ', async () => {
    await expect(SWSCContract.addMinter(accounts[1])).to.be.eventually.fulfilled
  })

  it('05. Mint 100 New Tokens as account[1]. Should be accepted.', async () => {
    await expect(SWSCContract.mint(accounts[2], 100, {from:accounts[1]})).to.be.eventually.fulfilled
    let totalSupply = await SWSCContract.totalSupply()
    console.log(`       Total Supply is: ${totalSupply.toNumber()}`);
    expect(totalSupply.toNumber()).to.be.equal(100)
  })
  it('06. Mint 100 New Tokens as account[0]. Should be accepted.', async () => {
    await expect(SWSCContract.mint(accounts[3], 100, {from:accounts[0]})).to.be.eventually.fulfilled
    let totalSupply = await SWSCContract.totalSupply()
    console.log(`       Total Supply is: ${totalSupply.toNumber()}`);
    expect(totalSupply.toNumber()).to.be.equal(200)
  })

  it('07. Check balance of accounts[2] and accounts[3]. Should be 100 each.', async () => {
    let balance2 = await SWSCContract.balanceOf(accounts[2])
    let balance3 = await SWSCContract.balanceOf(accounts[3])
    console.log(`       Balance #2 is: ${balance2.toNumber()}`);
    console.log(`       Balance #3 is: ${balance3.toNumber()}`);
    expect(balance2.toNumber()).to.be.equal(100)
    expect(balance3.toNumber()).to.be.equal(100)
  })

  it('08. Burn from accounts2 and accounts3 50 tokens.', async () => {
    await expect(SWSCContract.burn(50, {from:accounts[2]})).to.be.eventually.fulfilled
    await expect(SWSCContract.burn(50, {from:accounts[3]})).to.be.eventually.fulfilled

    let balance2 = await SWSCContract.balanceOf(accounts[2])
    let balance3 = await SWSCContract.balanceOf(accounts[3])
    console.log(`       Balance #2 is: ${balance2.toNumber()}`);
    console.log(`       Balance #3 is: ${balance3.toNumber()}`);
    expect(balance2.toNumber()).to.be.equal(50)
    expect(balance3.toNumber()).to.be.equal(50)
  })

  it('09. Transfer 10 token from accounts3 to accounts4.', async () => {
    await expect(SWSCContract.transfer(accounts[4],10,{from:accounts[3]})).to.be.eventually.fulfilled
    let balance3 = await SWSCContract.balanceOf(accounts[3])
    let balance4 = await SWSCContract.balanceOf(accounts[4])
    console.log(`       Balance #3 is: ${balance3.toNumber()}`);
    console.log(`       Balance #4 is: ${balance4.toNumber()}`);
    expect(balance3.toNumber()).to.be.equal(40)
    expect(balance4.toNumber()).to.be.equal(10)
  })
  it('10. Pause tokens transfer.', async () => {
    await expect(SWSCContract.pause()).to.be.eventually.fulfilled
    let paused = await SWSCContract.paused()
    console.log('       Token is paused: ', paused);
    expect(paused).to.be.true
  })

  it('11. Transfer 10 token from accounts3 to accounts4. Should fail.', async () => {
    await expect(SWSCContract.transfer(accounts[4],10,{from:accounts[3]})).to.be.eventually.rejected
    
    let balance3 = await SWSCContract.balanceOf(accounts[3])
    let balance4 = await SWSCContract.balanceOf(accounts[4])
    console.log(`       Balance #3 is: ${balance3.toNumber()}`);
    console.log(`       Balance #4 is: ${balance4.toNumber()}`);
    expect(balance3.toNumber()).to.be.equal(40)
    expect(balance4.toNumber()).to.be.equal(10)
  })

  it('12. UnPause tokens transfer.', async () => {
    await expect(SWSCContract.unpause()).to.be.eventually.fulfilled
    let paused = await SWSCContract.paused()
    console.log('       Token is paused: ', paused);
    expect(paused).to.be.false
  })

  it('13. Add account4 to blacklist.', async () => {
    await expect(SWSCContract.addToBlackList(accounts[4])).to.be.eventually.fulfilled
    let balance4 = await SWSCContract.balanceOf(accounts[4])
    console.log(`       Balance #4 is: ${balance4.toNumber()}`);
    expect(balance4.toNumber()).to.be.equal(10)
  })

  it('14. Transfer to or from account4 should not be possible.', async () => {
    await expect(SWSCContract.transfer(accounts[4],10,{from:accounts[3]})).to.be.eventually.rejected
    await expect(SWSCContract.transfer(accounts[3],10,{from:accounts[4]})).to.be.eventually.rejected
  })

  it('15. Destroy Black Funds of account[4].', async () => {
    let balance4 = await SWSCContract.balanceOf(accounts[4])
    let totalSupply = await SWSCContract.totalSupply()
    
    await expect(SWSCContract.destroyBlackFunds(accounts[4])).to.be.eventually.fulfilled
    let newBalance4 = await SWSCContract.balanceOf(accounts[4])
    let newTotalSupply = await SWSCContract.totalSupply()
    await expect(SWSCContract.removeFromBlackList(accounts[4])).to.be.eventually.fulfilled
    
    expect (newBalance4.toNumber()).to.be.equal(0);
    expect (newTotalSupply.toNumber()).to.be.equal(totalSupply.sub(balance4).toNumber());
  })

  it('16. Mint to many and check balance.', async () => {

    let expectedBalances = [1,2,3,4]
    let accountsToMint =[accounts[5],accounts[6],accounts[7],accounts[4]];
    await expect(SWSCContract.mintToMany(accountsToMint,expectedBalances)).to.be.eventually.fulfilled
    let balances = await SWSCContract.balanceOfMany(accountsToMint)

    for(let i = 0; i< balances.length;i++)
    {
      expect(balances[i].toNumber()).to.be.equal(expectedBalances[i])
    }
  })

  it('16. Transfer to many and check balances.', async () => {

    let expectedTransfers = [23,17]
    await expect(SWSCContract.transferToMany([accounts[8],accounts[9]],expectedTransfers,{from:accounts[3]})).to.be.eventually.fulfilled
    let balances = await SWSCContract.balanceOfMany([accounts[8],accounts[9]])

    for(let i = 0; i< balances.length;i++)
    {
      expect(balances[i].toNumber()).to.be.equal(expectedTransfers[i])
    }
  })


})

