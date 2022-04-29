import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { Mycalculatordapp } from "../target/types/mycalculatordapp";
//import { Mycalculatordapp } from "../target/types/mycalculatordapp";

const { SystemProgram } = anchor.web3;

describe("mycalculatordapp", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Mycalculatordapp as Program<Mycalculatordapp>;
  let _calculator:anchor.web3.Keypair;

  it('Creates a calculator', async () => {
    const calculator = anchor.web3.Keypair.generate();
    await program.rpc.create("Welcome to solana",{
      accounts:{
        calculator:calculator.publicKey,
        user:provider.wallet.publicKey,
        systemProgram:SystemProgram.programId,
      },
      signers:[calculator]
    });
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.greeting == "Welcome to solana");
    _calculator=calculator;
  });

  it("Adds two numbers", async function() {
    const calculator = _calculator;
    await program.rpc.add(new anchor.BN(3),new anchor.BN(4),{
      accounts:{
        calculator:calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(7)));
    assert.ok(account.greeting === "Welcome to solana");
    _calculator=calculator;
  });

  it('Multiplies two numbers', async function() {
    const calculator = _calculator
    await program.rpc.multiply(new anchor.BN(10),new anchor.BN(5),{
      accounts:{
        calculator:calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(50)));
    assert.ok(account.greeting === "Welcome to solana");
    _calculator=calculator;
  })

  it('Subtracts two numbers', async function() {
    const calculator = _calculator
    await program.rpc.subtract(new anchor.BN(10),new anchor.BN(5),{
      accounts:{
        calculator:calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(5)));
    assert.ok(account.greeting === "Welcome to solana");
    _calculator=calculator;
  });

  it('Divides two numbers', async function() {
    const calculator = _calculator
    await program.rpc.divide(new anchor.BN(10),new anchor.BN(5),{
      accounts:{
        calculator:calculator.publicKey,
      },
    });
    const account = await program.account.calculator.fetch(calculator.publicKey);
    assert.ok(account.result.eq(new anchor.BN(2)));
    assert.ok(account.remainder.eq(new anchor.BN(0)));
    assert.ok(account.greeting === "Welcome to solana");
    _calculator=calculator;
  });
});

// provider = responsible for connection between program and solana network
// program = abstraction that combines program,idl,programId
