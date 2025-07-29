-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "imagen" TEXT NOT NULL,
    "altura" INTEGER NOT NULL,
    "peso" INTEGER NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tipo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Tipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habilidad" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Habilidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonTipo" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "tipoId" INTEGER NOT NULL,

    CONSTRAINT "PokemonTipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokemonHabilidad" (
    "id" SERIAL NOT NULL,
    "pokemonId" INTEGER NOT NULL,
    "habilidadId" INTEGER NOT NULL,

    CONSTRAINT "PokemonHabilidad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_numero_key" ON "Pokemon"("numero");

-- CreateIndex
CREATE UNIQUE INDEX "Tipo_nombre_key" ON "Tipo"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Habilidad_nombre_key" ON "Habilidad"("nombre");

-- AddForeignKey
ALTER TABLE "PokemonTipo" ADD CONSTRAINT "PokemonTipo_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonTipo" ADD CONSTRAINT "PokemonTipo_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "Tipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonHabilidad" ADD CONSTRAINT "PokemonHabilidad_pokemonId_fkey" FOREIGN KEY ("pokemonId") REFERENCES "Pokemon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokemonHabilidad" ADD CONSTRAINT "PokemonHabilidad_habilidadId_fkey" FOREIGN KEY ("habilidadId") REFERENCES "Habilidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
