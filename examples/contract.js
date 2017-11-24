import { Apis } from "sbitjs-ws";
import { ChainStore, FetchChain, PrivateKey, TransactionBuilder } from "../lib";

var privKey = "5KUNaHFinDenZXE3A7BB4YKFRJfnNEPpJWB3wG6N2RyaekEDAye";
let pKey = PrivateKey.fromWif(privKey);

Apis.instance("wss://sbit.pixelplex.io/ws", true)
    .init_promise.then((res) => {
        ChainStore.init().then(() => {
            let fromAccount = "nathan";

            let sendAmount = {
                amount: 2280,
                asset: "CORE"
            };


            // Apis.instance().db_api().exec( "get_all_contracts", [  ] )
            // .then( contract => {
            //     console.log("contracts", contract);
            // }).catch(err => {
            //     console.log("cant fetch contract", err)
            // });
            Promise.all([
                FetchChain("getAccount", fromAccount),
                FetchChain("getAsset", sendAmount.asset)
            ]).then((res) => {
                // console.log("got data:", res);
                let [fromAccount, feeAsset] = res;
                // Memos are optional, but if you have one you need to encrypt it here
                let tr = new TransactionBuilder();
                tr.add_type_operation("contract", {
                    fee: {
                        amount: 0,
                        asset_id: feeAsset.get("id")
                    },
                    asset_id: feeAsset.get("id"),
                    registrar: fromAccount.get("id"),
                    receiver: "1.16.8", // undefined if creating contract
                    value: 0,
                    gasPrice: 0,
                    gas: 1000000,
                    code: "c07aaf0f",
                });
                tr.set_required_fees().then(() => {
                    tr.add_signer(pKey, pKey.toPublicKey().toPublicKeyString());
                    console.log("serialized transaction:", tr.serialize());
                    tr.broadcast();
                }).catch((reason) => {
                    console.log("error", reason);
                });
            });
        });
    });
