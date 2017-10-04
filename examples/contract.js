import { Apis } from "sbitjs-ws";
import { ChainStore, FetchChain, PrivateKey, TransactionBuilder } from "../lib";

var privKey = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3";
let pKey = PrivateKey.fromWif(privKey);

Apis.instance("ws://127.0.0.1:8090/ws", true)
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
                    asset_id: "1.3.0",
                    registrar: fromAccount.get("id"),
                    receiver: "1.16.0",
                    value: 0,
                    gasPrice: 0,
                    gas: 1000000,
                    code: "60606040527f4b0841b00539dff7fbbebc87eed9dbac2eb700c69f811fe91eb05975ecd8184b600055341561003057fe5b5b60978061003f6000396000f300606060405263ffffffff60e060020a6000350416635cbe77c78114602a578063b9c3d0a514604e575bfe5b3415603157fe5b603a600435605d565b604080519115158252519081900360200190f35b3415605557fe5b605b6068565b005b60005481145b919050565b5b5600a165627a7a7230582044cad05ef09e01201368f32c88e23aadb921e8170ccd58739efb0a98df9e41660029",
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
