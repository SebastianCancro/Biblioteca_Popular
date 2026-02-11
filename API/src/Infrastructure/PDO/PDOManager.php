<?php 

namespace Src\Infrastructure\PDO;

use PDO;

readonly class PDOManager {

	private PDO $client;

	public function __construct() {
		$client = new PDOClient();
		$this->client = $client->connect();
	}

	public function execute(
		string $query,
		array $parameters = []
	): array 
	{
		$stmt = $this->client->prepare($query);
		$stmt->execute($parameters);
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}	

    public function executeWithBind(
		string $query,
		array $bindValues = [] 
	): array 
	{
		$stmt = $this->client->prepare($query);

		foreach ($bindValues as $param => $info) {
			$stmt->bindValue($param, $info['value'], $info['type']);
		}

		$stmt->execute();
		return $stmt->fetchAll(PDO::FETCH_ASSOC);
	}
}	
