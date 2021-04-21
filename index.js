const AWS = require('aws-sdk')

const DynamoDB = new AWS.DynamoDB({ apiVersion: '2012-10-08' })

exports.handler = async (event) => {
  const products = await getProducts()

  return {
    statusCode: 200,
    body: JSON.stringify({ products: products || [] }),
  }
}

async function getProducts() {
  const rows = await DynamoDB.scan({ TableName: 'ton_sales_products' }).promise()

  return mapDynamoRows(rows.Items)
}

function mapDynamoRows(items) {
  return items.map((item) => {
    let result = {}

    const keys = Object.keys(item)
    keys.forEach((key) => {
      result[key] = Object.values(item[key])[0]
    })

    return result
  })
}
