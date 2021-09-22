export interface Config {
    ALERTS_URL: string;
    CHIA_ALERTS_PUBKEY: string;
    chia_ssl_ca: SslCaConfig;
    daemon_port: number;
    daemon_ssl: SslCertsConfig;
    farmer: FarmerConfig;
    full_node: FullNodeConfig;
    harvester: HarvesterConfig;
    inbound_rate_limit_percent: number;
    introducer: IntroducerConfig;
    logging: LoggingConfig;
    min_mainnet_k_size: number;
    network_overrides: NetworkOverridesConfig;
    outbound_rate_limit_percent: number;
    ping_interval: number;
    pool: PoolConfig;
    private_ssl_ca: SslCaConfig;
    selected_network: string;
    self_hostname: string;
    timelord: TimelordConfig;
    timelord_launcher: TimelordLauncherConfig;
    ui: UiConfig;
    wallet: WalletConfig;
}

export interface SslCaConfig {
    crt: string;
    key: string;
}

export interface SslCertsConfig {
    private_crt: string;
    private_key: string;
}

export interface FarmerConfig {
    full_node_peer: PeerHostConfig;
    harvester_peer: PeerHostConfig;
    logging: LoggingConfig;
    network_overrides: NetworkOverridesConfig;
    pool_public_keys?: null;
    pool_share_threshold: number;
    port: number;
    rpc_port: number;
    selected_network: string;
    ssl: SslConfig;
    start_rpc_server: boolean;
    xch_target_address: string;
}

export interface PeerHostConfig {
    host: string;
    port: number;
}

export interface LoggingConfig {
    log_filename: string;
    log_level: string;
    log_stdout: boolean;
}

export interface NetworkOverridesConfig {
    config: {
        mainnet: MainnetOrTestnet0Config;
        testnet0: MainnetOrTestnet0Config;
    };
    constants: ConstantsConfig;
}

export interface MainnetOrTestnet0Config {
    address_prefix: string;
}

export interface ConstantsConfig {
    mainnet: MainnetConfig;
    testnet0: Testnet0Config;
}

export interface MainnetConfig {
    GENESIS_CHALLENGE: string;
    GENESIS_PRE_FARM_FARMER_PUZZLE_HASH: string;
    GENESIS_PRE_FARM_POOL_PUZZLE_HASH: string;
    NETWORK_TYPE: number;
}

export interface Testnet0Config {
    GENESIS_CHALLENGE: string;
    GENESIS_PRE_FARM_FARMER_PUZZLE_HASH: string;
    GENESIS_PRE_FARM_POOL_PUZZLE_HASH: string;
    MIN_PLOT_SIZE: number;
    NETWORK_TYPE: number;
}

export interface SslConfig {
    private_crt: string;
    private_key: string;
    public_crt: string;
    public_key: string;
}

export interface FullNodeConfig {
    database_path: string;
    enable_upnp: boolean;
    farmer_peer: PeerHostConfig;
    introducer_peer: PeerHostConfig;
    logging: LoggingConfig;
    max_inbound_farmer: number;
    max_inbound_timelord: number;
    max_inbound_wallet: number;
    network_overrides: NetworkOverridesConfig;
    peer_connect_interval: number;
    peer_db_path: string;
    port: number;
    recent_peer_threshold: number;
    rpc_port: number;
    selected_network: string;
    send_uncompact_interval: number;
    short_sync_blocks_behind_threshold: number;
    simulator_database_path: string;
    simulator_peer_db_path: string;
    ssl: SslConfig;
    start_rpc_server: boolean;
    sync_blocks_behind_threshold: number;
    target_outbound_peer_count: number;
    target_peer_count: number;
    target_uncompact_proofs: number;
    timelord_peer: PeerHostConfig;
    wallet_peer: PeerHostConfig;
    weight_proof_timeout: number;
}

export interface HarvesterConfig {
    chia_ssl_ca: SslCaConfig;
    farmer_peer: PeerHostConfig;
    logging: LoggingConfig;
    network_overrides: NetworkOverridesConfig;
    num_threads: number;
    plot_directories?: string[] | null;
    port: number;
    private_ssl_ca: SslCaConfig;
    rpc_port: number;
    selected_network: string;
    ssl: SslCertsConfig;
    start_rpc_server: boolean;
}

export interface IntroducerConfig {
    host: string;
    logging: LoggingConfig;
    max_peers_to_send: number;
    network_overrides: NetworkOverridesConfig;
    port: number;
    recent_peer_threshold: number;
    selected_network: string;
    ssl: Ssl1Config;
}

export interface Ssl1Config {
    public_crt: string;
    public_key: string;
}

export interface PoolConfig {
    logging: LoggingConfig;
    network_overrides: NetworkOverridesConfig;
    selected_network: string;
    xch_target_address: string;
}

export interface TimelordConfig {
    fast_algorithm: boolean;
    full_node_peer: PeerHostConfig;
    logging: LoggingConfig;
    max_connection_time: number;
    network_overrides: NetworkOverridesConfig;
    port: number;
    sanitizer_mode: boolean;
    selected_network: string;
    ssl: SslConfig;
    vdf_clients: VdfClientsConfig;
    vdf_server: PeerHostConfig;
}

export interface VdfClientsConfig {
    ip?: string[] | null;
    ips_estimate?: number[] | null;
}

export interface TimelordLauncherConfig {
    logging: LoggingConfig;
    port: number;
    process_count: number;
}

export interface UiConfig {
    daemon_host: string;
    daemon_port: number;
    daemon_ssl: SslCertsConfig;
    logging: LoggingConfig;
    network_overrides: NetworkOverridesConfig;
    port: number;
    rpc_port: number;
    selected_network: string;
    ssh_filename: string;
}

export interface WalletConfig {
    database_path: string;
    full_node_peer: PeerHostConfig;
    initial_num_public_keys: number;
    initial_num_public_keys_new_wallet: number;
    introducer_peer: PeerHostConfig;
    logging: LoggingConfig;
    network_overrides: NetworkOverridesConfig;
    num_sync_batches: number;
    peer_connect_interval: number;
    port: number;
    recent_peer_threshold: number;
    rpc_port: number;
    selected_network: string;
    ssl: SslConfig;
    start_height_buffer: number;
    starting_height: number;
    target_peer_count: number;
    testing: boolean;
    trusted_peers: TrustedPeersConfig;
    wallet_peers_path: string;
}

export interface TrustedPeersConfig {
    public_crt: string;
}
