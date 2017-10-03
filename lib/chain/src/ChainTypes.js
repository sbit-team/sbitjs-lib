let ChainTypes = {};

ChainTypes.reserved_spaces = {
    relative_protocol_ids: 0,
    protocol_ids: 1,
    implementation_ids: 2
};

ChainTypes.object_type = {
    "null": 0,
    base: 1,
    account: 2,
    asset: 3,
    force_settlement: 4,
    committee_member: 5,
    witness: 6,
    limit_order: 7,
    call_order: 8,
    custom: 9,
    proposal: 10,
    operation_history: 11,
    withdraw_permission: 12,
    vesting_balance: 13,
    worker: 14,
    balance: 15,
    contract: 16
};

ChainTypes.impl_object_type = {
    global_property: 0,
    dynamic_global_property: 1,
    index_meta: 2,
    asset_dynamic_data: 3,
    asset_bitasset_data: 4,
    account_balance: 5,
    account_statistics: 6,
    transaction: 7,
    block_summary: 8,
    account_transaction_history: 9,
    blinded_balance: 10,
    chain_property: 11,
    witness_schedule: 12,
    budget_record: 13
};

ChainTypes.vote_type = {
    committee: 0,
    witness: 1,
    worker: 2
};

ChainTypes.operations = {
    transfer: 0,
    limit_order_create: 1,
    limit_order_cancel: 2,
    call_order_update: 3,
    fill_order: 4,
    contract : 5,
    account_create: 6,
    account_update: 7,
    account_whitelist: 8,
    account_upgrade: 9,
    account_transfer: 10,
    asset_create: 11,
    asset_update: 12,
    asset_update_bitasset: 13,
    asset_update_feed_producers: 14,
    asset_issue: 15,
    asset_reserve: 16,
    asset_fund_fee_pool: 17,
    asset_settle: 18,
    asset_global_settle: 19,
    asset_publish_feed: 20,
    witness_create: 21,
    witness_update: 22,
    proposal_create: 23,
    proposal_update: 24,
    proposal_delete: 25,
    withdraw_permission_create: 26,
    withdraw_permission_update: 27,
    withdraw_permission_claim: 28,
    withdraw_permission_delete: 29,
    committee_member_create: 30,
    committee_member_update: 31,
    committee_member_update_global_parameters: 32,
    vesting_balance_create: 33,
    vesting_balance_withdraw: 34,
    worker_create: 35,
    custom: 36,
    assert: 37,
    balance_claim: 38,
    override_transfer: 39,
    transfer_to_blind: 40,
    blind_transfer: 41,
    transfer_from_blind: 42,
    asset_settle_cancel: 43,
    asset_claim_fees: 44,
    fba_distribute: 45, 
    call_contract_with_verification: 46
};

export default ChainTypes;
