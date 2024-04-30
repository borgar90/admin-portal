const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

router.post("/", async (req, res) => {
  const { collectionName, fields, connectionString } = req.body;

  try {
    // Connect to user-provided MongoDB
    const userDB = await mongoose.createConnection(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const schemaDefinition = {};
    let typescriptInterface = `export interface I${collectionName} {\n`;
    fields.forEach((field) => {
      schemaDefinition[field.name] = { type: field.type };
      typescriptInterface += `  ${field.name}: ${field.type};\n`;
    });
    typescriptInterface += "}";

    const schema = new mongoose.Schema(schemaDefinition);
    userDB.model(collectionName, schema);

    // Write TypeScript model file
    const modelContent = `${typescriptInterface}\nconst schema = new mongoose.Schema(${JSON.stringify(
      schemaDefinition
    )});\nconst ${collectionName} = mongoose.model('${collectionName}', schema);\nexport default ${collectionName};`;
    fs.writeFileSync(
      path.join(__dirname, "../../../models", `${collectionName}.ts`),
      modelContent
    );

    res.json({ message: "Collection and model file created successfully" });
  } catch (error) {
    console.error("Failed to create collection/model:", error);
    res.status(500).json({ error: "Failed to create collection/model" });
  }
});

module.exports = router;
