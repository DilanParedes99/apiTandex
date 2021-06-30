-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-06-2021 a las 07:38:57
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `backend`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atributos`
--

CREATE TABLE `atributos` (
  `CodigoAtributo` int(11) NOT NULL,
  `NombreAtributo` varchar(255) NOT NULL,
  `Descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacora`
--

CREATE TABLE `bitacora` (
  `idBitacora` int(11) NOT NULL,
  `idCuenta` int(4) NOT NULL,
  `Fecha` date NOT NULL,
  `Accion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

CREATE TABLE `configuracion` (
  `idConfiguracion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta`
--

CREATE TABLE `cuenta` (
  `idCuenta` int(4) NOT NULL,
  `idUsuario` int(4) NOT NULL,
  `nivelCuenta` varchar(20) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Contrasena` varchar(2) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `Apellido_paterno` varchar(255) NOT NULL,
  `Apellido_materno` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cuenta`
--

INSERT INTO `cuenta` (`idCuenta`, `idUsuario`, `nivelCuenta`, `Correo`, `Contrasena`, `nombre`, `Apellido_paterno`, `Apellido_materno`, `telefono`) VALUES
(1, 1, 'Administrador', 'user@gmail.com', '12', 'User', 'Prueba', '', ''),
(2, 1, 'Admnistrador', 'carlos@outlook.com', '12', 'Brian Dilan ', 'Garcia', 'Paredes', '4433697997'),
(3, 1, 'Admnistrador', 'carlos@outlook.com', '12', 'Carlos', 'Gonzales', 'Mora', '4433697997'),
(4, 1, 'Admnistrador', 'carlos@outlook.com', 'sa', 'dilan', 'Gonzales', 'Mora', '4433697997');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle`
--

CREATE TABLE `detalle` (
  `idDetalle` int(11) NOT NULL,
  `idAtributo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ffloat`
--

CREATE TABLE `ffloat` (
  `idDetalle` int(11) NOT NULL,
  `Valor` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `iint`
--

CREATE TABLE `iint` (
  `idDetalle` int(11) NOT NULL,
  `Valor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plataforma`
--

CREATE TABLE `plataforma` (
  `idPlataforma` int(4) NOT NULL,
  `idConfiguracion` int(11) NOT NULL,
  `Nombre` varchar(20) NOT NULL,
  `Tokens` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `Clave` varchar(55) NOT NULL,
  `Descripción` varchar(255) NOT NULL,
  `Existencias` int(255) NOT NULL,
  `Línea` varchar(50) NOT NULL,
  `Unidad_de_entrada` varchar(10) NOT NULL,
  `Moneda` int(10) NOT NULL,
  `Fecha_ultima_compra` varchar(50) NOT NULL,
  `Ultimo_costo` int(50) NOT NULL,
  `Nombre_de_imagen` varchar(100) NOT NULL,
  `ID_SAE` varchar(255) NOT NULL,
  `Clave_unidad` varchar(50) NOT NULL,
  `Clave_alterna` varchar(255) NOT NULL,
  `Campo_libre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `Clave`, `Descripción`, `Existencias`, `Línea`, `Unidad_de_entrada`, `Moneda`, `Fecha_ultima_compra`, `Ultimo_costo`, `Nombre_de_imagen`, `ID_SAE`, `Clave_unidad`, `Clave_alterna`, `Campo_libre`) VALUES
(1, '4957812602105', 'Amplificador yamaha rs202', 14, '26AMP', 'pz', 1, '17/05/2021', 0, '', 'F43624DA-EE0F-4900-94FE-CEB3D336680D', 'H87', '', ''),
(2, '4957812602105', 'Extensor HDMI1x8 cat6 epcom', 4, '', 'pz', 1, '14/05/2021', 0, 'Extensor', '599C50F9-23F8-49C0-A8CF-374179253EE0', 'H87', '', ''),
(3, '4957812602105', 'Servicio de manejo de Materiales', 0, '', 'No aplica', 1, '14/05/2021', 0, '', '0F6E8665-DAED-4F5D-9BD9-4DF962FCC612', 'E48', '', ''),
(4, '4957812602105', 'Cable bocina c16 honeywell', 2, '', 'pz', 1, '14/05/2021', 0, '', '44555FDE-BDE8-47DD-B7DA-2FB95AE2B505', 'MTR', '', ''),
(5, '4957812602105', 'Cable Bocina c14 honeywell', 1, '', 'pz', 1, '14/05/2021', 0, '', 'EF33D993-A93E-48A0-8960-BF9DE9492A4C', 'MTR', '', ''),
(6, '4957812602105', 'Teatro en casa Onkyo HTS3910', 3, '07HTE', 'pz', 1, '14/05/2021', 0, '', 'EAA892A3-C965-4643-9D61-F4843F0F8722', 'H87', '', ''),
(7, '4957812602105', 'Bocinas Cerwin Vega SDS525b', 14, '08BOC', 'pz', 1, '14/05/2021', 0, '', '5255CF31-40BD-4DB2-9345-1E20688A2EFB', 'H87', 'SKHT743658900321', ''),
(8, '4957812602105', 'Protector de corriente furman m8x2', 4, '37ACC', 'pz', 1, '14/05/2021', 0, '', 'F3F4EA51-D21B-4C2E-B766-AD0AF7380E59', 'H87', '', ''),
(9, '4957812602105', 'Reproductor de cd onkyo dxc390 b multipl', 2, '07CDS', 'pz', 1, '13/05/2021', 0, '', 'BEEEB295-0C87-40B6-8F5D-E6AA510C827C', 'H87', '', ''),
(10, '4957812602105', 'Reproductor de disco onkyo C7030', 1, '07CDS', 'pz', 1, '13/05/2021', 0, '', '8CE72C10-6DC9-4871-B103-820B7F905B57', 'H87', '', ''),
(11, '4957812602105', 'Amplificador onkyo tx8140', 6, '07AMP', 'pz', 1, '13/05/2021', 0, '', '9236BC6C-E77B-4C61-8A4E-4CA833A8C742', 'H87', '', ''),
(12, '4957812602105', 'Bocina Sonos Roam White portatil', 2, '37SON', 'pz', 1, '06/05/2021', 0, '', '64CC0AE4-6C58-4435-9335-2EB5A19D16A9', 'H87', '', ''),
(13, '4957812602105', 'Amplificador Onkyo Txnr696', 9, '07AMP', 'pz', 1, '06/05/2021', 0, '', '761A4E7D-A315-43B6-A604-0D8659150406', 'H87', '', ''),
(14, '4957812602105', 'Bocina Sonos Roam Black portatil', 2, '37SON', 'pz', 1, '06/05/2021', 0, '', '375FA1AE-DB8F-41B9-9402-BEA3A2878462', 'H87', '', ''),
(15, '4957812602105', 'Alexa Echo Dot (3s Gen) Negro', 4, '', 'pz', 1, '04/05/2021', 0, '', '57E67E03-BA53-4094-A506-2E78EA33A762', 'H87', '', ''),
(16, '4957812602105', 'Alexa Echo Dot (4a Gen) Azul', 3, '', 'pz', 1, '04/05/2021', 0, '', '5252FD08-98F3-48A6-8418-BF3527C5360A', 'H87', '', ''),
(17, '4957812602105', 'Alexa Echo Dot (4a Gen) Negro', 9, '', 'pz', 1, '04/05/2021', 0, '', 'B434297E-62BC-48A1-B149-DA5F5750C17D', 'H87', '', ''),
(18, '4957812602105', 'Foco Inteligente Sengled', 1, '', 'pz', 1, '04/05/2021', 0, '', '4A318414-30E7-4718-B554-CA9E43C9157F', '', '', ''),
(19, '4957812602105', 'Reproductor Sonos AMP', 3, '37SON', 'pz', 1, '28/04/2021', 0, '', '7BE039C3-2427-41E0-AD4E-A1234256B1F4', 'H87', '', ''),
(20, '4957812602105', 'Amplificador Onkyo A9110', 3, '07AMP', 'pz', 1, '28/04/2021', 0, '', '510F9CC3-9D2B-4C1B-AA3E-0941D3F20836', 'H87', '', ''),
(21, '4957812602105', 'Bocinas yamaha nsaw150 negro', 13, '26BOC', 'pz', 1, '22/04/2021', 0, '', '9195D4C0-C3CD-4A37-91A8-0F353249456E', 'H87', '', ''),
(22, '4957812602105', 'Bocinas yamaha nsaw150w', 10, '26BOC', 'pz', 1, '22/04/2021', 0, '', 'A7413100-DE42-4951-A9C8-857E088D0F63', 'H87', '', ''),
(23, '4957812602105', 'Amplificador Yamaha wxa50', 0, '27AMP', 'pz', 1, '19/04/2021', 0, '', '3950485A-0655-4674-9E40-ACA169CE614E', 'H87', '', ''),
(24, '4957812602105', 'Preamplificador yamaha wxc50ds', 0, '26AMP', 'pz', 1, '19/04/2021', 0, '', '767FE862-F980-49A1-9B52-2F9E8A2231EC', 'H87', '', ''),
(25, '4957812602105', 'Mezcladora yamaha emx2 (amp)', 1, '26MZC', 'pz', 1, '16/04/2021', 0, '', 'E4EF1ED8-5801-4EE7-A2D4-DCF2569107F7', 'H87', '', ''),
(26, '4957812602105', 'Fuente de poder lutron qspsdh175', 2, '72ACC', 'pz', 2, '15/04/2021', 0, '', '844823B4-923A-45A7-B1A9-6711A04BD0E6', 'H87', '', ''),
(27, '4957812602105', 'Modulo de potencia lutron lqrjwpm6p', 0, '72HQS', 'pz', 2, '15/04/2021', 0, '', '48D9F0C9-3BA8-4182-9532-70CD4F86CFE6', 'H87', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicaciones`
--

CREATE TABLE `publicaciones` (
  `idPublicacion` int(11) NOT NULL,
  `idProducto` int(11) NOT NULL,
  `Amazon` int(1) NOT NULL,
  `MercadoLibre` int(1) NOT NULL,
  `WooComerce` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(4) NOT NULL,
  `Nombre` varchar(40) NOT NULL,
  `Apellido_paterno` varchar(40) NOT NULL,
  `Apellido_materno` varchar(40) NOT NULL,
  `Telefono` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `Nombre`, `Apellido_paterno`, `Apellido_materno`, `Telefono`) VALUES
(1, 'User', 'User', 'User', '4433778899');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vvarchar`
--

CREATE TABLE `vvarchar` (
  `idDetalle` int(11) NOT NULL,
  `Valor` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `atributos`
--
ALTER TABLE `atributos`
  ADD PRIMARY KEY (`CodigoAtributo`);

--
-- Indices de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  ADD PRIMARY KEY (`idBitacora`);

--
-- Indices de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`idConfiguracion`);

--
-- Indices de la tabla `cuenta`
--
ALTER TABLE `cuenta`
  ADD PRIMARY KEY (`idCuenta`),
  ADD KEY `fk_idUsuario` (`idUsuario`);

--
-- Indices de la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD PRIMARY KEY (`idDetalle`);

--
-- Indices de la tabla `plataforma`
--
ALTER TABLE `plataforma`
  ADD PRIMARY KEY (`idPlataforma`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  ADD PRIMARY KEY (`idPublicacion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `atributos`
--
ALTER TABLE `atributos`
  MODIFY `CodigoAtributo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  MODIFY `idBitacora` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  MODIFY `idConfiguracion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cuenta`
--
ALTER TABLE `cuenta`
  MODIFY `idCuenta` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `detalle`
--
ALTER TABLE `detalle`
  MODIFY `idDetalle` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `plataforma`
--
ALTER TABLE `plataforma`
  MODIFY `idPlataforma` int(4) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `publicaciones`
--
ALTER TABLE `publicaciones`
  MODIFY `idPublicacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cuenta`
--
ALTER TABLE `cuenta`
  ADD CONSTRAINT `fk_idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
