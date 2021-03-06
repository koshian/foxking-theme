#!/usr/bin/env ruby
require 'webrick'
require 'webrick/ssl'

cn = [['CN', WEBrick::Utils::getservername]]
cert, key = WEBrick::Utils.create_self_signed_cert(1024, cn,
                                                   'Generated by webrick')
s = WEBrick::HTTPServer.new(
  :DocumentRoot => './',
  :ServerName => WEBrick::Utils::getservername,
  :BindAddress => '127.0.0.1',
  :Port => 4000,
  :SSLEnable => true,
  :SSLVerifyClient => OpenSSL::SSL::VERIFY_NONE,
  :SSLPrivateKey => OpenSSL::PKey::RSA.new(key.to_s),
  :SSLCertificate => OpenSSL::X509::Certificate.new(cert.to_s),
  :SSLCertName => cn)


trap('INT') { s.shutdown }
s.start
