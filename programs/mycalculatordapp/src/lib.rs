use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("5W9NjKUddLvnKcEjuSRskp6FEEwQpWmRpjnt3w22ZFne");

#[program] //marker
pub mod mycalculatordapp {
    use super::*;
    
    pub fn create(ctx:Context<Create>,init_message:String) -> ProgramResult{
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }
    pub fn add(ctx:Context<Addition>,num1:i64,num2:i64) -> ProgramResult{
        let calculator = &mut ctx.accounts.calculator;
        calculator.result=num1+num2;
        Ok(())
    }
    pub fn subtract(ctx:Context<Subtraction>,num1:i64,num2:i64) -> ProgramResult{
        let calculator = &mut ctx.accounts.calculator;
        calculator.result=num1-num2;
        Ok(())
    }
    pub fn multiply(ctx: Context<Multiplication>, num1:i64, num2:i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result=num1*num2;
        Ok(())
    } 
    pub fn divide(ctx: Context<Division>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result=num1/num2;
        calculator.remainder=num1%num2;
        Ok(())
    }
}

#[derive(Accounts)] 
pub struct Create<'info>{ //'info = It is inner struct AccountInfo which contains variables like is_writable,executable,data etc
    #[account(init,payer=user,space=8 + 64 + 64 + 64 + 64)]
    pub calculator: Account<'info,Calculator>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)] 
pub struct Addition<'info>{ //'info = It is inner struct AccountInfo which contains variables like is_writable,executable,data etc
    #[account(mut)]
    pub calculator: Account<'info,Calculator>,
}
#[derive(Accounts)] 
pub struct Subtraction<'info>{ 
    #[account(mut)]
    pub calculator: Account<'info,Calculator>,
}
#[derive(Accounts)] 
pub struct Multiplication<'info>{ 
    #[account(mut)]
    pub calculator: Account<'info,Calculator>,
}
#[derive(Accounts)] 
pub struct Division<'info>{ 
    #[account(mut)]
    pub calculator: Account<'info,Calculator>,
}

#[account]
pub struct Calculator{
    pub greeting : String,
    pub result: i64,
    pub remainder: i64,
}

//The first argument of these functions is always Context<T> which consist of the solana accounts array and the program ID, which in essence is the required data to call just about any progarm on Solana. 
//Everything is an account in solana
//Program is an account which is executable

// &mut = reference rather than copy. mut is to make the value mutable

//main use of anchor is anchor takes care of serialization and decerialization

//account is used to store info on blockchain for the instructions. Ex:- Division account stores info for the instruction division