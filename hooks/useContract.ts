import { useAccount, useChainId } from 'wagmi'
import { CONTRACT_ADDRESSES, SUPPORTED_CHAINS } from '@/contracts/addresses'
import { ABIS } from '@/contracts/abis'
import { ContractConfig, ContractName, CoreContractName } from '@/contracts/types'

export function useContract(contractName: CoreContractName): ContractConfig | null {
  const chainId = useChainId()
  if (!chainId || !CONTRACT_ADDRESSES[chainId]) {
    return null
  }

  const address = CONTRACT_ADDRESSES[chainId][contractName]
  const abi = ABIS[contractName]
  const explorer = CONTRACT_ADDRESSES[chainId].explorer

  if (!address || !abi) {
    return null
  }

  return {
    address,
    abi,
    explorer
  }
}
