#!/bin/bash

# Script de deploy simplificado para EasyFile

echo "🔨 Preparando aplicação para deploy..."

# Instalar dependências
echo "📦 Instalando dependências..."
npm ci --legacy-peer-deps

# Build da aplicação
echo "🏗️ Fazendo build da aplicação..."
npm run build

echo "✅ Build concluído!"
echo "📝 Arquivos prontos para deploy:"
echo "   - dist/spa/ (frontend)"
echo "   - dist/server/ (backend)"
echo ""
echo "🚀 Para deploy na EasyFile:"
echo "   1. Use Dockerfile.easyfile"
echo "   2. Configure as variáveis de ambiente"
echo "   3. Exponha a porta 3000"
