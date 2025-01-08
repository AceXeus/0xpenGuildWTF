import * as fs from 'fs'
import * as path from 'path'

async function updateAddresses() {
  try {
    // Đọc log từ file deploy.log
    const deploymentOutput = fs.readFileSync(path.join(__dirname, '../contracts/deploy.log'), 'utf8')
    
    const addresses = {
      NFTMarketplace: '',
      PenGuildPool: '',
      XPSystem: '',
      CreatorCollection: '',
    }
    
    deploymentOutput.split('\n').forEach(line => {
      if (line.includes('NFTMarketplace - ')) {
        addresses.NFTMarketplace = line.split('- ')[1].trim()
      } else if (line.includes('PenGuildPool - ')) {
        addresses.PenGuildPool = line.split('- ')[1].trim()
      } else if (line.includes('XPSystem - ')) {
        addresses.XPSystem = line.split('- ')[1].trim()
      } else if (line.includes('CreatorCollection - ')) {
        addresses.CreatorCollection = line.split('- ')[1].trim()
      }
    })

    const addressesPath = path.join(__dirname, '../contracts/addresses.ts')
    let content = fs.readFileSync(addressesPath, 'utf8')

    Object.entries(addresses).forEach(([contract, address]) => {
      const regex = new RegExp(`${contract}: ".*?"`)
      content = content.replace(regex, `${contract}: "${address}"`)
    })

    fs.writeFileSync(addressesPath, content)
  } catch (error) {
    console.error('Error updating addresses:', error)
  }
}

updateAddresses()
